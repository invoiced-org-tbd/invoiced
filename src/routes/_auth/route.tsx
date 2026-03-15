import { getAuthSessionQueryOptions } from '@/api/auth/getAuthSession';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
	component: AuthLayout,
});

function AuthLayout() {
	const { data: session } = useSuspenseQuery(getAuthSessionQueryOptions());

	if (!session) {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}

	return <Outlet />;
}
