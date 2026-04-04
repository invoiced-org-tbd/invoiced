import { db } from '@/db/client';
import { invoiceTable } from '@/db/tables/invoiceTable';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
	ServerError,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { invoiceQueryKeys } from './invoiceApiUtils';
import { getServerT } from '@/utils/languageUtils';

const deleteInvoiceParams = z.object({
	id: z.string(),
});

type DeleteInvoiceParams = z.infer<typeof deleteInvoiceParams>;

const deleteInvoiceServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(deleteInvoiceParams)
	.handler(async ({ data, context: { user, language } }) => {
		try {
			const t = getServerT(language);
			const { id } = data;

			const [invoice] = await db
				.update(invoiceTable)
				.set({
					isDeleted: true,
				})
				.where(and(eq(invoiceTable.id, id), eq(invoiceTable.userId, user.id)))
				.returning({ id: invoiceTable.id });

			if (!invoice) {
				throw new ServerError({
					message: t('invoices.server.notFound'),
				});
			}

			return createSuccessResponse({
				message: t('invoices.server.deletedSuccess'),
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export const deleteInvoiceMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: DeleteInvoiceParams) => deleteInvoiceServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [invoiceQueryKeys.base()],
			});
		},
	});
