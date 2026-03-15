import { ensureAuthSessionQueryOptions } from '@/api/auth';
import { getCompanyQueryOptions } from '@/api/company';
import { AccountDrawer } from '@/components/account-drawer';
import { Sidebar } from '@/components/sidebar';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AuthenticatedSidebar } from './-lib/components/authenticated-sidebar';

export const Route = createFileRoute('/_auth/app')({
	beforeLoad: async ({ context }) => {
		const session = await context.queryClient.ensureQueryData(
			ensureAuthSessionQueryOptions(),
		);

		const company = await context.queryClient.ensureQueryData(
			getCompanyQueryOptions({
				userId: session.user.id,
			}),
		);
		if (company) {
			return;
		}

		throw redirect({ to: '/create-company', replace: true });
	},
	component: AppLayout,
});

function AppLayout() {
	return (
		<Sidebar.Root>
			<AuthenticatedSidebar />
			<Outlet />

			<AccountDrawer />
		</Sidebar.Root>
	);
}
