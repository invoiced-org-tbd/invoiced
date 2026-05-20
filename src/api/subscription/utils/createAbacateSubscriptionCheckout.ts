import '@tanstack/react-start/server-only';

import { abacatepay } from '@/lib/abacatepay';
import { envServer } from '@/lib/envServer';
import type { Plan } from '@/lib/planLimits';
import { getProductIdForPlan } from '@/lib/planProductIds';

export const createAbacateSubscriptionCheckout = async (params: {
	userId: string;
	plan: Plan;
}) => {
	const productId = getProductIdForPlan(params.plan);
	const baseUrl = envServer.BETTER_AUTH_URL.replace(/\/$/, '');

	const checkout = await abacatepay.subscriptions.create({
		items: [{ id: productId, quantity: 1 }],
		externalId: params.userId,
		completionUrl: `${baseUrl}/app/settings?tab=billingPlans`,
		returnUrl: `${baseUrl}/app/plan`,
		metadata: {
			userId: params.userId,
			plan: params.plan,
		},
		methods: ['CARD', 'PIX'],
	});

	const url =
		typeof checkout === 'object' && checkout !== null && 'url' in checkout
			? String((checkout as { url: string }).url)
			: null;

	if (!url) {
		throw new Error('AbacatePay checkout did not return a URL');
	}

	return { url };
};
