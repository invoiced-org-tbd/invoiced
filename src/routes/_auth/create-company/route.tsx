import { useCompany } from '@/hooks/use-company';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/create-company')({
	component: CreateCompanyLayout,
});

function CreateCompanyLayout() {
	const { company } = useCompany();

	if (company) {
		return (
			<Navigate
				to='/app'
				replace
			/>
		);
	}

	return <Outlet />;
}
