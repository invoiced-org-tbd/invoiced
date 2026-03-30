import { db } from '@/db/client';
import { smtpConfigTable } from '@/db/tables/smtpConfigTable';
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
import { smtpQueryKeys } from './smtpApiUtils';
import { smtpUpsertSchema } from './smtpUpsertSchema';

const updateSmtpConfigParams = smtpUpsertSchema
	.extend({
		id: z.string().min(1),
	})
	.clone();

type UpdateSmtpConfigParams = z.infer<typeof updateSmtpConfigParams>;

const updateSmtpConfigServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(updateSmtpConfigParams)
	.handler(async ({ data, context: { user } }) => {
		try {
			const currentConfig = await db.query.smtpConfigTable.findFirst({
				where: {
					id: data.id,
					userId: user.id,
				},
			});

			if (!currentConfig) {
				throw new ServerError({
					message: 'SMTP config not found',
					statusCode: HTTP_STATUS_CODES.NOT_FOUND,
				});
			}

			await db
				.update(smtpConfigTable)
				.set({
					name: data.name,
					host: data.host,
					port: data.port,
					security: data.security,
					username: data.username,
					password: data.password || currentConfig.password,
					fromName: data.fromName || null,
					fromEmail: data.fromEmail,
				})
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
