import { db } from '@/db/client';
import { emailTemplateTable } from '@/db/tables/emailTemplateTable';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
	HTTP_STATUS_CODES,
	ServerError,
} from '@/utils/serverFnsUtils';
import { getServerT } from '@/utils/languageUtils';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { emailTemplateQueryKeys } from './emailTemplateApiUtils';
import { emailTemplateUpsertFormSchema } from '@/routes/_auth/app/settings/-lib/settings-automations-tab/emailTemplateUpsertFormSchema';

const createEmailTemplateParams = z.object({
	form: emailTemplateUpsertFormSchema,
});

type CreateEmailTemplateParams = z.infer<typeof createEmailTemplateParams>;

const createEmailTemplateServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(createEmailTemplateParams)
	.handler(async ({ data: { form }, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			const [createdTemplate] = await db
				.insert(emailTemplateTable)
				.values({
					userId: user.id,
					name: form.name,
					slug: form.slug,
					subject: form.subject,
					body: form.body,
				})
				.returning();

			if (!createdTemplate) {
				throw new ServerError({
					message: t('settings.tabs.automations.emailTemplates.errors.createFailed'),
					statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
				});
			}

			return createSuccessResponse();
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const createEmailTemplateMutationOptions = () =>
	createMutationOptions({
		mutationFn: (params: CreateEmailTemplateParams) =>
			createEmailTemplateServerFn({ data: params }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [emailTemplateQueryKeys.base()],
			});
		},
	});
