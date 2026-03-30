import { useSuspenseQuery } from '@tanstack/react-query';
import { getCompanyQueryOptions } from '@/api/company/getCompany';

export const useCompany = () => {
	const { data: company } = useSuspenseQuery(getCompanyQueryOptions());

	return { company };
};
