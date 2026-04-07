import z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { createServerFn } from '@tanstack/react-start';
import { getServerT } from '@/utils/languageUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { db } from '@/db/client';
import { emailTemplateTable } from '@/db/tables/emailTemplateTable';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import { emailTemplateQueryKeys } from './emailTemplateApiUtils';

const duplicateEmailTemplateParams = z.object({
	editId: z.string().min(1),
});
type DuplicateEmailTemplateParams = z.infer<
	typeof duplicateEmailTemplateParams
>;

const duplicateEmailTemplateServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(duplicateEmailTemplateParams)
	.handler(async ({ data: { editId }, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			const baseEmailTemplate = await db.query.emailTemplateTable.findFirst({
				where: {
					id: editId,
					userId: user.id,
				},
				columns: {
					id: true,
					name: true,
					slug: true,
					subject: true,
					body: true,
				},
			});

			if (!baseEmailTemplate) {
				return createSuccessResponse({
					data: null,
					message: t('entity.notFound', {
						entity: t('settings.tabs.automations.emailTemplates.entityName'),
					}),
				});
			}

			await db.insert(emailTemplateTable).values({
				userId: user.id,
				name: baseEmailTemplate.name,
				slug: baseEmailTemplate.slug,
				subject: baseEmailTemplate.subject,
				body: baseEmailTemplate.body,
			});

			return createSuccessResponse({
				message: t(
					'settings.tabs.automations.emailTemplates.feedback.duplicateSuccess',
				),
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const duplicateEmailTemplateMutationOptions = () =>
	createMutationOptions({
		mutationFn: (params: DuplicateEmailTemplateParams) =>
			duplicateEmailTemplateServerFn({ data: params }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [emailTemplateQueryKeys.base()],
			});
		},
	});
