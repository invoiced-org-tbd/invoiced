import { db } from '@/db/client';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { contractQueryKeys } from './contractApiUtils';
import { sessionMiddleware } from '../sessionMiddleware';

const getContractsServerFn = createServerFn({
	method: 'GET',
})
	.middleware([sessionMiddleware])
	.handler(async ({ context: { user } }) => {
		try {
			const contracts = await db.query.contractTable.findMany({
				where: {
					userId: user.id,
				},
				orderBy: {
					createdAt: 'desc',
				},
				with: {
					role: true,
					client: {
						with: {
							address: true,
						},
					},
					invoiceRecurrence: {
						with: {
							items: true,
						},
					},
					autoSend: true,
				},
			});

			return createSuccessResponse({
				data: contracts,
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export type GetContractsResponse = ExtractServerFnData<
	typeof getContractsServerFn
>;

export const getContractsQueryOptions = () =>
	createQueryOptions({
		queryKey: contractQueryKeys.get(),
		queryFn: () => getContractsServerFn(),
	});
