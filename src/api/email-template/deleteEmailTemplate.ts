import { db } from '@/db/client';
import { emailTemplateTable } from '@/db/tables/emailTemplateTable';
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

const deleteEmailTemplateParams = z.object({
	id: z.string().min(1),
});
type DeleteEmailTemplateParams = z.infer<typeof deleteEmailTemplateParams>;

const deleteEmailTemplateServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(deleteEmailTemplateParams)
	.handler(async ({ data, context: { user } }) => {
		try {
			await db
				.delete(emailTemplateTable)
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

export const deleteEmailTemplateMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: DeleteEmailTemplateParams) =>
			deleteEmailTemplateServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [emailTemplateQueryKeys.base()],
			});
		},
	});
