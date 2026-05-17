import { createFileRoute, Navigate } from '@tanstack/react-router';
import { getAuthSessionQueryOptions } from '@/api/auth/getAuthSession';
import { LandingPage } from './-lib/components/landing-page/LandingPage';
import { landingCopy } from './-lib/components/landing-page/landingCopy';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/')({
	head: () => ({
		meta: [
			{
				title: landingCopy.seo.title,
			},
			{
				name: 'description',
				content: landingCopy.seo.description,
			},
		],
	}),
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
