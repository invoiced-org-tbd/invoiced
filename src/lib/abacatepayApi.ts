import '@tanstack/react-start/server-only';

import { envServer } from './envServer';

const ABACATEPAY_API_BASE = 'https://api.abacatepay.com/v2';

type AbacatePayApiResponse<T> = {
	data: T;
	success: boolean;
	error: string | null;
};

const abacatePayFetch = async <T>(
	path: string,
	options: { method: 'POST'; body: Record<string, unknown> },
): Promise<T> => {
	const response = await fetch(`${ABACATEPAY_API_BASE}${path}`, {
		method: options.method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${envServer.ABACATEPAY_API_KEY}`,
		},
		body: JSON.stringify(options.body),
	});

	const json = (await response.json()) as AbacatePayApiResponse<T> & {
		error?: string;
	};

	if (!response.ok || json.error) {
		throw new Error(json.error ?? `AbacatePay API error: ${response.status}`);
	}

	return json.data;
};

export const cancelAbacateSubscription = (subscriptionId: string) =>
	abacatePayFetch<{ id: string; status: string }>('/subscriptions/cancel', {
		method: 'POST',
		body: { id: subscriptionId },
	});

export const changeAbacateSubscriptionPlan = (params: {
	subscriptionId: string;
	productId: string;
	quantity?: number;
}) =>
	abacatePayFetch<{ id: string; subscriptionId: string; status: string }>(
		'/subscriptions/change-plan',
		{
			method: 'POST',
			body: {
				id: params.subscriptionId,
				productId: params.productId,
				quantity: params.quantity ?? 1,
			},
		},
	);
