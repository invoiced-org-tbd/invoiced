import { AccountDrawer } from '@/components/account-drawer/AccountDrawer';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { AuthenticatedSidebar } from './-lib/components/authenticated-sidebar/AuthenticatedSidebar';
import { useCompany } from '@/hooks/use-company/useCompany';

export const Route = createFileRoute('/_auth/app')({
	component: AppLayout,
});

function AppLayout() {
	const { company } = useCompany();

	if (!company) {
		return (
			<Navigate
				to='/create-company'
				replace
			/>
		);
	}

	return (
		<Sidebar.Root inset>
			<AuthenticatedSidebar />

			<Sidebar.Inset>
				<Outlet />
			</Sidebar.Inset>

			<AccountDrawer />
		</Sidebar.Root>
	);
}
