import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { getServerT } from '@/utils/languageUtils';
import { db } from '@/db/client';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import { emailTemplateQueryKeys } from './emailTemplateApiUtils';

const getEditEmailTemplateParams = z.object({
	id: z.string(),
});

export type GetEditEmailTemplateParams = z.infer<
	typeof getEditEmailTemplateParams
>;

const getEditEmailTemplateServerFn = createServerFn({
	method: 'GET',
})
	.middleware([sessionMiddleware])
	.inputValidator(getEditEmailTemplateParams)
	.handler(async ({ data, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			const emailTemplate = await db.query.emailTemplateTable.findFirst({
				where: {
					id: data.id,
					userId: user.id,
				},
			});

			if (!emailTemplate) {
				return createSuccessResponse({
					data: null,
					message: t('entity.notFound', {
						entity: t('settings.tabs.automations.emailTemplates.entityName'),
					}),
				});
			}

			return createSuccessResponse({
				data: emailTemplate,
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const getEditEmailTemplateQueryOptions = (
	params: GetEditEmailTemplateParams,
) =>
	createQueryOptions({
		queryKey: emailTemplateQueryKeys.getEditEmailTemplate(params),
		queryFn: () => getEditEmailTemplateServerFn({ data: params }),
	});
