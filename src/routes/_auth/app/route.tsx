import { getSubscriptionQueryOptions } from '@/api/subscription/getSubscription';
import { OnboardingPanel } from '@/components/onboarding-panel/OnboardingPanel';
import { Sidebar } from '@/components/sidebar/Sidebar';
import {
	createFileRoute,
	Outlet,
	useRouterState,
} from '@tanstack/react-router';
import { AuthenticatedSidebar } from './-lib/components/authenticated-sidebar/AuthenticatedSidebar';
import { SubscriptionGate } from './-lib/components/subscription-gate/SubscriptionGate';

export const Route = createFileRoute('/_auth/app')({
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(getSubscriptionQueryOptions());
	},
	component: AppLayout,
});

function AppLayout() {
	const { location } = useRouterState();
	const isPlanRoute = location.pathname === '/app/plan';

	return (
		<SubscriptionGate>
			{isPlanRoute ? (
				<Outlet />
			) : (
				<Sidebar.Root inset>
					<AuthenticatedSidebar />
					<Outlet />
					<OnboardingPanel />
				</Sidebar.Root>
			)}
		</SubscriptionGate>
	);
}
