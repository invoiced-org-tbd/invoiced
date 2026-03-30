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
import type z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { smtpQueryKeys } from './smtpApiUtils';
import { smtpUpsertSchema } from './smtpUpsertSchema';

const createSmtpConfigParams = smtpUpsertSchema.clone();
type CreateSmtpConfigParams = z.infer<typeof createSmtpConfigParams>;

const createSmtpConfigServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(createSmtpConfigParams)
	.handler(async ({ data, context: { user } }) => {
		try {
			if (!data.password) {
				throw new ServerError({
					message: 'SMTP password is required',
					statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
				});
			}

			const [createdSmtpConfig] = await db
				.insert(smtpConfigTable)
				.values({
					userId: user.id,
					name: data.name,
					host: data.host,
					port: data.port,
					security: data.security,
					username: data.username,
					password: data.password,
					fromName: data.fromName || null,
					fromEmail: data.fromEmail,
				})
				.returning();

			if (!createdSmtpConfig) {
				throw new ServerError({
					message: 'Failed to create SMTP config',
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

export const createSmtpConfigMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: CreateSmtpConfigParams) =>
			createSmtpConfigServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [smtpQueryKeys.base()],
			});
		},
	});
