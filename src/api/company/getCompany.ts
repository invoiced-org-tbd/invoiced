import { db } from '@/db/client';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { sessionMiddleware } from '../sessionMiddleware';
import { companyQueryKeys } from './companyApiUtils';

const getCompanyServerFn = createServerFn({
	method: 'GET',
})
	.middleware([sessionMiddleware])
	.handler(async ({ context: { user } }) => {
		try {
			const company = await db.query.companyTable.findFirst({
				where: {
					userId: user.id,
				},
				with: {
					address: true,
				},
			});

			return createSuccessResponse({
				data: company,
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export type GetCompanyResponse = ExtractServerFnData<typeof getCompanyServerFn>;

export const getCompanyQueryOptions = () =>
	createQueryOptions({
		queryKey: companyQueryKeys.get(),
		queryFn: () => getCompanyServerFn(),
	});
