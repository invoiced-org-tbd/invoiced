import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { db } from '@/db/client';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import { contractQueryKeys } from './contractApiUtils';
import { sessionMiddleware } from '../sessionMiddleware';

const getContractEditParams = z.object({
	id: z.string(),
});

export type GetContractEditParams = z.infer<typeof getContractEditParams>;

const getContractEditServerFn = createServerFn({
	method: 'GET',
})
	.middleware([sessionMiddleware])
	.inputValidator(getContractEditParams)
	.handler(async ({ data, context: { user } }) => {
		try {
			const contract = await db.query.contractTable.findFirst({
				where: {
					id: data.id,
					userId: user.id,
				},
				with: {
					role: true,
					client: true,
				},
			});

			return createSuccessResponse({
				data: contract,
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export type GetContractEditResponse = ExtractServerFnData<
	typeof getContractEditServerFn
>;

export const getContractEditQueryOptions = (params: GetContractEditParams) =>
	createQueryOptions({
		queryKey: contractQueryKeys.edit(params),
		queryFn: () => getContractEditServerFn({ data: params }),
	});
