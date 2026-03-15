import { db } from '@/db/client';
import { handleQueryFn } from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import type z from 'zod';
import { companyQueryKeys, selectCompany } from './companyApiUtils';

const getCompanyParams = selectCompany.pick({
	userId: true,
});
type GetCompanyParams = z.infer<typeof getCompanyParams>;

const getCompanyServerFn = createServerFn({
	method: 'GET',
})
	.inputValidator(getCompanyParams)
	.handler(async ({ data: { userId } }) => {
		try {
			const company = await db.query.companyTable.findFirst({
				where: {
					userId,
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

export const getCompanyQueryOptions = ({ userId }: GetCompanyParams) =>
	queryOptions({
		queryKey: companyQueryKeys.get({ userId }),
		queryFn: () =>
			handleQueryFn(() =>
				getCompanyServerFn({
					data: { userId },
				}),
			),
	});
