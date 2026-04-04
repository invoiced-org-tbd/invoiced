import { AccountDrawer } from '@/components/account-drawer/AccountDrawer';
import { OnboardingPanel } from '@/components/onboarding-panel/OnboardingPanel';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AuthenticatedSidebar } from './-lib/components/authenticated-sidebar/AuthenticatedSidebar';

export const Route = createFileRoute('/_auth/app')({
	component: AppLayout,
});

function AppLayout() {
	return (
		<Sidebar.Root inset>
			<AuthenticatedSidebar />

			<Sidebar.Inset>
				<Outlet />
			</Sidebar.Inset>

			<OnboardingPanel />
			<AccountDrawer />
		</Sidebar.Root>
	);
}
