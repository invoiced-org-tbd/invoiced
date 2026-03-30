import { AccountDrawer } from '@/components/account-drawer/AccountDrawer';
import { OnboardingChecklist } from '@/components/onboarding-checklist/OnboardingChecklist';
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

			<OnboardingChecklist />
			<AccountDrawer />
		</Sidebar.Root>
	);
}
