import { createFileRoute, redirect } from '@tanstack/react-router';
import { getAuthSessionQueryOptions } from '@/api/auth';
import { LandingPage } from './-lib/components/landing-page';

export const Route = createFileRoute('/')({
	beforeLoad: async ({ context }) => {
		const session = await context.queryClient.ensureQueryData(
			getAuthSessionQueryOptions(),
		);

		if (session) {
			throw redirect({ to: '/app' });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <LandingPage />;
}
