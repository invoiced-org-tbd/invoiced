import { getEmailTemplatesQueryOptions } from '@/api/email-template/getEmailTemplates';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useEmailTemplates = () => {
	const { data: emailTemplates } = useSuspenseQuery(
		getEmailTemplatesQueryOptions(),
	);

	return { emailTemplates };
};
