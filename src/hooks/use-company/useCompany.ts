import { useSuspenseQuery } from '@tanstack/react-query';
import { useUser } from '../use-user';
import { getCompanyQueryOptions } from '@/api/company';

export const useCompany = () => {
	const user = useUser();

	const { data: company } = useSuspenseQuery(
		getCompanyQueryOptions({
			userId: user.id,
		}),
	);

	// biome-ignore lint/style/noNonNullAssertion: company is guaranteed to be not null since we check in the beforeLoad
	return { company: company! };
};
