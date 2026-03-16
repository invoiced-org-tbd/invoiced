import { db } from '@/db/client';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { ensureAuthSessionServerFn } from '../auth/ensureAuthSession';
import { contractQueryKeys } from './contractApiUtils';

const getContractsServerFn = createServerFn({
	method: 'GET',
}).handler(async () => {
	try {
		const {
			data: { user },
		} = await ensureAuthSessionServerFn();

		const contracts = await db.query.contractTable.findMany({
			where: {
				userId: user.id,
			},
			with: {
				role: true,
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
