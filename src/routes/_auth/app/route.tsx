import { AccountDrawer } from '@/components/account-drawer';
import { Sidebar } from '@/components/sidebar';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { AuthenticatedSidebar } from './-lib/components/authenticated-sidebar';
import { useCompany } from '@/hooks/use-company';

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
		<Sidebar.Root>
			<AuthenticatedSidebar />
			<Outlet />

			<AccountDrawer />
		</Sidebar.Root>
	);
}
