import { useSuspenseQuery } from '@tanstack/react-query';
import { getCompanyQueryOptions } from '@/api/company/getCompany';

export const useCompany = () => {
	const { data: company } = useSuspenseQuery(getCompanyQueryOptions());

	// biome-ignore lint/style/noNonNullAssertion: company is guaranteed to be not null since we check before loading the route outlet
	return { company: company! };
};
