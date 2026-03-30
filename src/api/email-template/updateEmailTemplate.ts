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
import { and, eq } from 'drizzle-orm';
import z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { emailTemplateQueryKeys } from './emailTemplateApiUtils';
import { emailTemplateUpsertSchema } from './emailTemplateUpsertSchema';

const updateEmailTemplateParams = emailTemplateUpsertSchema
	.extend({
		id: z.string().min(1),
	})
	.clone();

type UpdateEmailTemplateParams = z.infer<typeof updateEmailTemplateParams>;

const updateEmailTemplateServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(updateEmailTemplateParams)
	.handler(async ({ data, context: { user } }) => {
		try {
			const currentTemplate = await db.query.emailTemplateTable.findFirst({
				where: {
					id: data.id,
					userId: user.id,
				},
			});

			if (!currentTemplate) {
				throw new ServerError({
					message: 'Email template not found',
					statusCode: HTTP_STATUS_CODES.NOT_FOUND,
				});
			}

			await db
				.update(emailTemplateTable)
				.set({
					name: data.name,
					slug: data.slug,
					subject: data.subject,
					body: data.body,
				})
				.where(
					and(
						eq(emailTemplateTable.id, data.id),
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
		mutationFn: (data: UpdateEmailTemplateParams) =>
			updateEmailTemplateServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [emailTemplateQueryKeys.base()],
			});
		},
	});
