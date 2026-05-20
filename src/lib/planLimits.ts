export const PLANS = ['starter', 'pro'] as const;
export type Plan = (typeof PLANS)[number];

export const SUBSCRIPTION_STATUSES = [
	'active',
	'cancelled',
	'past_due',
	'trialing',
] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

export const ACTIVE_SUBSCRIPTION_STATUSES: SubscriptionStatus[] = [
	'active',
	'trialing',
];

export const PLAN_LIMITS = {
	starter: {
		maxContracts: 1,
		autoSend: false,
	},
	pro: {
		maxContracts: Number.POSITIVE_INFINITY,
		autoSend: true,
	},
} as const satisfies Record<Plan, { maxContracts: number; autoSend: boolean }>;

export const PLAN_PRICING = {
	starter: {
		priceInCents: 1990,
		label: 'Starter',
	},
	pro: {
		priceInCents: 3900,
		label: 'Pro',
	},
} as const satisfies Record<Plan, { priceInCents: number; label: string }>;

export const isSubscriptionActive = (
	status: SubscriptionStatus | string | null,
) =>
	status !== null &&
	ACTIVE_SUBSCRIPTION_STATUSES.includes(status as SubscriptionStatus);
