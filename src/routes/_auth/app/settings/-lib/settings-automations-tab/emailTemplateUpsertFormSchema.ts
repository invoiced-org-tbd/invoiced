import { getEditEmailTemplateQueryOptions } from '@/api/email-template/getEditEmailTemplate';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';

export const emailTemplateUpsertFormSchema = z.object({
	name: z.string().min(1),
	slug: z.string().min(1),
	subject: z.string().min(1),
	body: z.string().min(1),
});

type UseEmailTemplateUpsertFormDefaultValuesParams = {
	editId?: string;
	isDuplicating?: boolean;
};
export const useEmailTemplateUpsertFormDefaultValues = ({
	editId,
	isDuplicating,
}: UseEmailTemplateUpsertFormDefaultValuesParams) => {
	const { data, isFetching } = useQuery({
		...getEditEmailTemplateQueryOptions({
			id: editId ?? '',
		}),
		enabled: !!editId || !!isDuplicating,
	});
	const isCreate = !editId && !isDuplicating;
	const emailTemplateData = isCreate ? undefined : data;

	return {
		defaultValues: {
			name: emailTemplateData?.name ?? '',
			slug: emailTemplateData?.slug ?? '',
			subject: emailTemplateData?.subject ?? '',
			body: emailTemplateData?.body ?? '',
		},
		isLoadingEditEmailTemplate: isFetching,
	};
};
