import '@tanstack/react-start/server-only';

import { db } from '@/db/client';
import { contractTable } from '@/db/tables/contractTable';
import { subscriptionTable } from '@/db/tables/subscriptionTable';
import type { Plan, SubscriptionStatus } from '@/lib/planLimits';
import { isSubscriptionActive, PLAN_LIMITS } from '@/lib/planLimits';
import { getT } from '@/utils/languageUtils';
import { ServerError } from '@/utils/serverFnsUtils';
import { count, eq } from 'drizzle-orm';

export const getUserSubscription = async (userId: string) => {
	return db.query.subscriptionTable.findFirst({
		where: {
			userId,
		},
	});
};

export const assertActiveSubscription = async (userId: string) => {
	const subscription = await getUserSubscription(userId);

	if (!subscription || !isSubscriptionActive(subscription.status)) {
		const t = getT();
		throw new ServerError({
			message: t('subscription.server.subscriptionRequired'),
			statusCode: 403,
		});
	}

	return subscription;
};

export const assertCanCreateContract = async (userId: string) => {
	const subscription = await assertActiveSubscription(userId);
	const limits = PLAN_LIMITS[subscription.plan as Plan];
	const t = getT();

	const [result] = await db
		.select({ count: count() })
		.from(contractTable)
		.where(eq(contractTable.userId, userId));

	const contractCount = result?.count ?? 0;

	if (contractCount >= limits.maxContracts) {
		throw new ServerError({
			message: t('subscription.server.contractLimitReached'),
			statusCode: 403,
		});
	}

	return subscription;
};

export const assertCanUseAutoSend = async (userId: string) => {
	const subscription = await assertActiveSubscription(userId);
	const limits = PLAN_LIMITS[subscription.plan as Plan];
	const t = getT();

	if (!limits.autoSend) {
		throw new ServerError({
			message: t('subscription.server.autoSendProOnly'),
			statusCode: 403,
		});
	}

	return subscription;
};

export const mapAbacateStatusToLocal = (status: string): SubscriptionStatus => {
	switch (status.toUpperCase()) {
		case 'ACTIVE':
			return 'active';
		case 'CANCELLED':
			return 'cancelled';
		case 'FAILED':
			return 'past_due';
		default:
			return 'active';
	}
};

export const upsertSubscriptionForUser = async (params: {
	userId: string;
	plan: Plan;
	status: SubscriptionStatus;
	abacateSubscriptionId?: string | null;
	abacateCustomerId?: string | null;
	trialEndsAt?: Date | null;
	currentPeriodEnd?: Date | null;
}) => {
	const existing = await getUserSubscription(params.userId);

	const values = {
		plan: params.plan,
		status: params.status,
		abacateSubscriptionId: params.abacateSubscriptionId ?? null,
		abacateCustomerId: params.abacateCustomerId ?? null,
		trialEndsAt: params.trialEndsAt ?? null,
		currentPeriodEnd: params.currentPeriodEnd ?? null,
	};

	if (existing) {
		await db
			.update(subscriptionTable)
			.set(values)
			.where(eq(subscriptionTable.userId, params.userId));
		return { ...existing, ...values };
	}

	const [created] = await db
		.insert(subscriptionTable)
		.values({
			userId: params.userId,
			...values,
		})
		.returning();

	return created;
};
