import { db } from '@/db/client';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { sessionMiddleware } from '../sessionMiddleware';
import { smtpQueryKeys } from './smtpApiUtils';

const getSmtpConfigsServerFn = createServerFn({
	method: 'GET',
})
	.middleware([sessionMiddleware])
	.handler(async ({ context: { user } }) => {
		try {
			const smtpConfigs = await db.query.smtpConfigTable.findMany({
				where: {
					userId: user.id,
				},
				orderBy: {
					updatedAt: 'desc',
				},
				columns: {
					password: false,
				},
			});

			return createSuccessResponse({
				data: smtpConfigs,
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export type GetSmtpConfigsResponse = ExtractServerFnData<
	typeof getSmtpConfigsServerFn
>;

export const getSmtpConfigsQueryOptions = () =>
	createQueryOptions({
		queryKey: smtpQueryKeys.get(),
		queryFn: () => getSmtpConfigsServerFn(),
	});
