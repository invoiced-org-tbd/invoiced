import { createServerFn } from '@tanstack/react-start';
import { sessionMiddleware } from '../sessionMiddleware';
import { db } from '@/db/client';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import { invoiceQueryKeys } from './invoiceApiUtils';

const getInvoicesServerFn = createServerFn({
	method: 'GET',
})
	.middleware([sessionMiddleware])
	.handler(async ({ context: { user } }) => {
		try {
			const invoices = await db.query.invoiceTable.findMany({
				where: {
					userId: user.id,
				},
				with: {
					items: true,
				},
			});

			return createSuccessResponse({
				data: invoices,
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export type GetInvoicesResponse = ExtractServerFnData<typeof getInvoicesServerFn>;

export const getInvoicesQueryOptions = () =>
	createQueryOptions({
		queryKey: invoiceQueryKeys.get(),
		queryFn: () => getInvoicesServerFn(),
	});
