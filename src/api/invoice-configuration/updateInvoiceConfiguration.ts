import { db } from '@/db/client';
import { invoiceConfigurationTable } from '@/db/tables/invoiceConfigurationTable';
import { invoiceConfigurationPersistSchema } from '@/components/invoice-configuration-form/invoiceConfigurationFormSchemas';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
	HTTP_STATUS_CODES,
	ServerError,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { eq } from 'drizzle-orm';
import z from 'zod';
import { getServerT } from '@/utils/languageUtils';
import { sessionMiddleware } from '../sessionMiddleware';
import { invoiceConfigurationQueryKeys } from './invoiceConfigurationApiUtils';

const updateInvoiceConfigurationParams = z.object({
	form: invoiceConfigurationPersistSchema,
});
type UpdateInvoiceConfigurationParams = z.infer<
	typeof updateInvoiceConfigurationParams
>;

const updateInvoiceConfigurationServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(updateInvoiceConfigurationParams)
	.handler(async ({ data: { form }, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			const existing = await db.query.invoiceConfigurationTable.findFirst({
				where: {
					userId: user.id,
				},
				columns: {
					id: true,
				},
			});

			if (!existing) {
				throw new ServerError({
					message: t('entity.notFound', {
						entity: t('settings.tabs.invoice.entityName'),
					}),
					statusCode: HTTP_STATUS_CODES.NOT_FOUND,
				});
			}

			await db
				.update(invoiceConfigurationTable)
				.set({
					prefix: form.prefix,
					suffix: form.suffix || null,
					withYear: form.withYear,
					withMonth: form.withMonth,
					withDay: form.withDay,
					withCompanyName: form.withCompanyName,
					lastInvoiceNumber: form.lastInvoiceNumber,
				})
				.where(eq(invoiceConfigurationTable.userId, user.id));

			return createSuccessResponse();
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const updateInvoiceConfigurationMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: UpdateInvoiceConfigurationParams) =>
			updateInvoiceConfigurationServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [invoiceConfigurationQueryKeys.base()],
			});
		},
	});
