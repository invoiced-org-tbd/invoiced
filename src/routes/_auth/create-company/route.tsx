import { ensureAuthSessionQueryOptions } from '@/api/auth';
import { getCompanyQueryOptions } from '@/api/company';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/create-company')({
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
			throw redirect({ to: '/app', replace: true });
		}
	},
});
