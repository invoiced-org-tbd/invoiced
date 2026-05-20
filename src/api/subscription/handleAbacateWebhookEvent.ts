import '@tanstack/react-start/server-only';
import type { Plan, SubscriptionStatus } from '@/lib/planLimits';
import { PLANS } from '@/lib/planLimits';
import { getPlanFromProductId } from '@/lib/planProductIds';
import {
	mapAbacateStatusToLocal,
	upsertSubscriptionForUser,
} from './subscriptionUtils';

type WebhookPayload = {
	id: string;
	event: string;
	apiVersion: number;
	devMode: boolean;
	data: Record<string, unknown>;
};

const parsePlanFromMetadata = (metadata: unknown): Plan | null => {
	if (!metadata || typeof metadata !== 'object') {
		return null;
	}
	const plan = (metadata as { plan?: string }).plan;
	if (plan && PLANS.includes(plan as Plan)) {
		return plan as Plan;
	}
	return null;
};

const parseUserId = (payload: WebhookPayload, sub: Record<string, unknown>) => {
	const metadata = payload.data.metadata ?? sub.metadata;
	if (metadata && typeof metadata === 'object') {
		const userId = (metadata as { userId?: string }).userId;
		if (typeof userId === 'string') {
			return userId;
		}
	}
	if (typeof payload.data.externalId === 'string') {
		return payload.data.externalId;
	}
	if (typeof sub.externalId === 'string') {
		return sub.externalId;
	}
	return null;
};

const getSubscriptionFromPayload = (data: Record<string, unknown>) => {
	const subscription = data.subscription;
	if (subscription && typeof subscription === 'object') {
		return subscription as Record<string, unknown>;
	}
	return data;
};

const resolvePlan = (
	payload: WebhookPayload,
	sub: Record<string, unknown>,
): Plan | null => {
	const metadata = payload.data.metadata ?? sub.metadata;
	const planFromMetadata = parsePlanFromMetadata(metadata);
	if (planFromMetadata) {
		return planFromMetadata;
	}

	const items = payload.data.items as Array<{ id?: string }> | undefined;
	if (items?.[0]?.id) {
		return getPlanFromProductId(items[0].id);
	}

	if (typeof sub.amount === 'number') {
		if (sub.amount === 1990) return 'starter';
		if (sub.amount === 3900) return 'pro';
	}

	return null;
};

export const handleAbacateWebhookEvent = async (payload: WebhookPayload) => {
	const sub = getSubscriptionFromPayload(payload.data);
	const userId = parseUserId(payload, sub);

	if (!userId) {
		console.error('[abacatepay webhook] Missing userId', payload.event);
		return;
	}

	const plan = resolvePlan(payload, sub);
	if (!plan) {
		console.error('[abacatepay webhook] Could not resolve plan', payload.event);
		return;
	}

	const subscriptionId = typeof sub.id === 'string' ? sub.id : null;
	const customerId = typeof sub.customerId === 'string' ? sub.customerId : null;
	const trialEndsAt =
		typeof sub.trialEndsAt === 'string' ? new Date(sub.trialEndsAt) : null;

	let status: SubscriptionStatus = 'active';

	switch (payload.event) {
		case 'subscription.trial_started':
			status = 'trialing';
			break;
		case 'subscription.completed':
			status = trialEndsAt ? 'trialing' : 'active';
			break;
		case 'subscription.renewed':
			status = 'active';
			break;
		case 'subscription.cancelled':
			status = 'cancelled';
			break;
		default:
			return;
	}

	if (
		typeof sub.status === 'string' &&
		payload.event !== 'subscription.trial_started'
	) {
		status = mapAbacateStatusToLocal(sub.status);
	}

	await upsertSubscriptionForUser({
		userId,
		plan,
		status,
		abacateSubscriptionId: subscriptionId,
		abacateCustomerId: customerId,
		trialEndsAt,
		currentPeriodEnd: trialEndsAt,
	});
};
