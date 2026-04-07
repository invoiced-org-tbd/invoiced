import { db } from '@/db/client';
import { smtpConfigTable } from '@/db/tables/smtpConfigTable';
import { smtpUpdateFormSchema } from '@/routes/_auth/app/settings/-lib/settings-automations-tab/smtpUpsertFormSchemas';
import { getServerT } from '@/utils/languageUtils';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
	ServerError,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { and, eq } from 'drizzle-orm';
import z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { smtpQueryKeys } from './smtpApiUtils';

const updateSmtpConfigParams = z.object({
	form: smtpUpdateFormSchema,
	editId: z.string().min(1),
});

type UpdateSmtpConfigParams = z.infer<typeof updateSmtpConfigParams>;

const updateSmtpConfigServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(updateSmtpConfigParams)
	.handler(async ({ data: { form, editId }, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			const currentConfig = await db.query.smtpConfigTable.findFirst({
				where: {
					id: editId,
					userId: user.id,
				},
				columns: {
					id: true,
				},
			});

			if (!currentConfig) {
				throw new ServerError({
					message: t('entity.notFound', {
						entity: t('settings.tabs.automations.smtp.entityName'),
					}),
				});
			}

			const updateData: Partial<typeof smtpConfigTable.$inferInsert> = {
				name: form.name,
				host: form.host,
				port: form.port,
				security: form.security,
				username: form.username,
				fromName: form.fromName || null,
				fromEmail: form.fromEmail,
			};

			if (form.password) {
				updateData.password = form.password;
			}

			await db
				.update(smtpConfigTable)
				.set(updateData)
				.where(
					and(
						eq(smtpConfigTable.id, currentConfig.id),
						eq(smtpConfigTable.userId, user.id),
					),
				);

			return createSuccessResponse();
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const updateSmtpConfigMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: UpdateSmtpConfigParams) =>
			updateSmtpConfigServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [smtpQueryKeys.base()],
			});
		},
	});
