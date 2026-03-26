import { db } from '@/db/client';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { sessionMiddleware } from '../sessionMiddleware';
import { invoiceConfigurationQueryKeys } from './invoiceConfigurationApiUtils';

const getInvoiceConfigurationServerFn = createServerFn({
	method: 'GET',
})
	.middleware([sessionMiddleware])
	.handler(async ({ context: { user } }) => {
		try {
			const invoiceConfiguration =
				await db.query.invoiceConfigurationTable.findFirst({
					where: {
						userId: user.id,
					},
				});

			return createSuccessResponse({ data: invoiceConfiguration });
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export const getInvoiceConfigurationQueryOptions = () =>
	createQueryOptions({
		queryKey: invoiceConfigurationQueryKeys.base(),
		queryFn: () => getInvoiceConfigurationServerFn(),
	});
