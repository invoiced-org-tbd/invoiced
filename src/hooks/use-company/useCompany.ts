import { useSuspenseQuery } from '@tanstack/react-query';
import { useUser } from '../use-user';
import { getCompanyQueryOptions } from '@/api/company/getCompany';

export const useCompany = () => {
	const user = useUser();

	const { data: company } = useSuspenseQuery(
		getCompanyQueryOptions({
			userId: user.id,
		}),
	);

	// biome-ignore lint/style/noNonNullAssertion: company is guaranteed to be not null since we check before loading the route outlet
	return { company: company! };
};
