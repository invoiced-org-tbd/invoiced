import { getSmtpConfigsQueryOptions } from '@/api/smtp/getSmtpConfigs';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSmtpConfigs = () => {
	const { data: smtpConfigs } = useSuspenseQuery(getSmtpConfigsQueryOptions());

	return { smtpConfigs };
};
