import { db } from '@/db/client';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { companyQueryKeys } from './companyApiUtils';
import { ensureAuthSessionServerFn } from '../auth/ensureAuthSession';

const getCompanyServerFn = createServerFn({
	method: 'GET',
}).handler(async () => {
	try {
		const {
			data: { user },
		} = await ensureAuthSessionServerFn();

		const company = await db.query.companyTable.findFirst({
			where: {
				userId: user.id,
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

export const getCompanyQueryOptions = () =>
	createQueryOptions({
		queryKey: companyQueryKeys.get(),
		queryFn: () => getCompanyServerFn(),
	});
