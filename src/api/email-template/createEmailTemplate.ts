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
import { createServerFn } from '@tanstack/react-start';
import type z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { emailTemplateQueryKeys } from './emailTemplateApiUtils';
import { emailTemplateUpsertSchema } from './emailTemplateUpsertSchema';

const createEmailTemplateParams = emailTemplateUpsertSchema.clone();
type CreateEmailTemplateParams = z.infer<typeof createEmailTemplateParams>;

const createEmailTemplateServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(createEmailTemplateParams)
	.handler(async ({ data, context: { user } }) => {
		try {
			const [createdTemplate] = await db
				.insert(emailTemplateTable)
				.values({
					userId: user.id,
					name: data.name,
					slug: data.slug,
					subject: data.subject,
					body: data.body,
				})
				.returning();

			if (!createdTemplate) {
				throw new ServerError({
					message: 'Failed to create email template',
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
		mutationFn: (data: CreateEmailTemplateParams) =>
			createEmailTemplateServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [emailTemplateQueryKeys.base()],
			});
		},
	});
