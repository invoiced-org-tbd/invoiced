import { db } from '@/db/client';
import { smtpConfigTable } from '@/db/tables/smtpConfigTable';
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
import { smtpQueryKeys } from './smtpApiUtils';

const deleteSmtpConfigParams = z.object({
	id: z.string().min(1),
});
type DeleteSmtpConfigParams = z.infer<typeof deleteSmtpConfigParams>;

const deleteSmtpConfigServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(deleteSmtpConfigParams)
	.handler(async ({ data, context: { user } }) => {
		try {
			await db
				.delete(smtpConfigTable)
				.where(
					and(
						eq(smtpConfigTable.id, data.id),
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

export const deleteSmtpConfigMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: DeleteSmtpConfigParams) =>
			deleteSmtpConfigServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [smtpQueryKeys.base()],
			});
		},
	});
