import { getSubscriptionQueryOptions } from '@/api/subscription/getSubscription';
import { isSubscriptionActive } from '@/lib/planLimits';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Navigate, Outlet, useRouterState } from '@tanstack/react-router';
import type { ReactNode } from 'react';

type SubscriptionGateProps = {
	children?: ReactNode;
};

export const SubscriptionGate = ({ children }: SubscriptionGateProps) => {
	const { location } = useRouterState();
	const { data: subscription } = useSuspenseQuery(
		getSubscriptionQueryOptions(),
	);

	const isPlanRoute = location.pathname === '/app/plan';
	const hasActiveSubscription =
		subscription !== null && isSubscriptionActive(subscription.status);

	if (!hasActiveSubscription && !isPlanRoute) {
		return (
			<Navigate
				to='/app/plan'
				replace
			/>
		);
	}

	if (hasActiveSubscription && isPlanRoute) {
		return (
			<Navigate
				to='/app/dashboard'
				replace
			/>
		);
	}

	return children ? <>{children}</> : <Outlet />;
};
