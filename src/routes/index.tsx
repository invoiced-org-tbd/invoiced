import { createFileRoute, Navigate } from '@tanstack/react-router';
import { getAuthSessionQueryOptions } from '@/api/auth/getAuthSession';
import { LandingPage } from './-lib/components/landing-page/LandingPage';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session } = useSuspenseQuery(getAuthSessionQueryOptions());

	if (session) {
		return (
			<Navigate
				to='/app'
				replace
			/>
		);
	}

	return <LandingPage />;
}
