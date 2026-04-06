import { getEditSmptConfigQueryOptions } from '@/api/smtp/getEditSmptConfig';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';

const smtpSecuritySchema = z.enum(['none', 'ssl_tls', 'starttls']);
export type SmtpSecurity = z.infer<typeof smtpSecuritySchema>;

const smtpBaseSchema = z.object({
	name: z.string().min(1),
	host: z.string().min(1),
	port: z.number().int().min(1).max(65535),
	security: smtpSecuritySchema,
	username: z.string().min(1),
	fromName: z.string().optional(),
	fromEmail: z.email(),
});

export const smtpCreateFormSchema = smtpBaseSchema.extend({
	password: z.string().min(1),
});
export type SmtpCreateFormSchema = z.infer<typeof smtpCreateFormSchema>;

export const smtpUpdateFormSchema = smtpBaseSchema.partial().extend({
	password: z.string(),
});
type SmtpUpdateFormSchema = z.infer<typeof smtpUpdateFormSchema>;

type UseSmtpUpsertFormDefaultValuesParams = {
	editId?: string;
};
export const useSmtpUpsertFormDefaultValues = ({
	editId,
}: UseSmtpUpsertFormDefaultValuesParams) => {
	const { data, isFetching } = useQuery({
		...getEditSmptConfigQueryOptions({
			id: editId ?? '',
		}),
		enabled: !!editId,
	});

	const editSmtpConfig = editId ? data : undefined;

	return {
		defaultValues: {
			name: editSmtpConfig?.name ?? '',
			host: editSmtpConfig?.host ?? '',
			port: editSmtpConfig?.port ?? 587,
			security: editSmtpConfig?.security ?? 'starttls',
			username: editSmtpConfig?.username ?? '',
			fromEmail: editSmtpConfig?.fromEmail ?? '',
			fromName: editSmtpConfig?.fromName ?? '',
			password: '',
		} satisfies SmtpCreateFormSchema | SmtpUpdateFormSchema as
			| SmtpCreateFormSchema
			| SmtpUpdateFormSchema,
		isLoadingEditSmtpConfig: isFetching,
	};
};
