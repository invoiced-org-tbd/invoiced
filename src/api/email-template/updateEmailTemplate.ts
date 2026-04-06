import { db } from '@/db/client';
import { emailTemplateTable } from '@/db/tables/emailTemplateTable';
import { emailTemplateUpsertFormSchema } from '@/routes/_auth/app/settings/-lib/settings-automations-tab/emailTemplateUpsertFormSchema';
import { getServerT } from '@/utils/languageUtils';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { and, eq } from 'drizzle-orm';
import z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { emailTemplateQueryKeys } from './emailTemplateApiUtils';

const updateEmailTemplateParams = z.object({
	editId: z.string().min(1),
	form: emailTemplateUpsertFormSchema,
});

type UpdateEmailTemplateParams = z.infer<typeof updateEmailTemplateParams>;

const updateEmailTemplateServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(updateEmailTemplateParams)
	.handler(async ({ data: { form, editId }, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			const currentTemplate = await db.query.emailTemplateTable.findFirst({
				where: {
					id: editId,
					userId: user.id,
				},
			});

			if (!currentTemplate) {
				return createSuccessResponse({
					data: null,
					message: t('entity.notFound', {
						entity: t('settings.tabs.automations.emailTemplates.entityName'),
					}),
				});
			}

			await db
				.update(emailTemplateTable)
				.set({
					name: form.name,
					slug: form.slug,
					subject: form.subject,
					body: form.body,
				})
				.where(
					and(
						eq(emailTemplateTable.id, currentTemplate.id),
						eq(emailTemplateTable.userId, user.id),
					),
				);

			return createSuccessResponse();
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const updateEmailTemplateMutationOptions = () =>
	createMutationOptions({
		mutationFn: (params: UpdateEmailTemplateParams) =>
			updateEmailTemplateServerFn({ data: params }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [emailTemplateQueryKeys.base()],
			});
		},
	});
