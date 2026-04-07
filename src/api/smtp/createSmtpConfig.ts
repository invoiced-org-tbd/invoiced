import { db } from '@/db/client';
import { smtpConfigTable } from '@/db/tables/smtpConfigTable';
import { smtpCreateFormSchema } from '@/routes/_auth/app/settings/-lib/settings-automations-tab/smtpUpsertFormSchemas';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { smtpQueryKeys } from './smtpApiUtils';

const createSmtpConfigParams = z.object({
	form: smtpCreateFormSchema,
});
type CreateSmtpConfigParams = z.infer<typeof createSmtpConfigParams>;

const createSmtpConfigServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(createSmtpConfigParams)
	.handler(async ({ data: { form }, context: { user } }) => {
		try {
			await db.insert(smtpConfigTable).values({
				userId: user.id,
				name: form.name,
				host: form.host,
				port: form.port,
				security: form.security,
				username: form.username,
				password: form.password,
				fromName: form.fromName,
				fromEmail: form.fromEmail,
			});

			return createSuccessResponse();
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const createSmtpConfigMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: CreateSmtpConfigParams) =>
			createSmtpConfigServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [smtpQueryKeys.base()],
			});
		},
	});
