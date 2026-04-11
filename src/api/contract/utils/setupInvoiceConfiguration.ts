import '@tanstack/react-start/server-only';

import { invoiceConfigurationTable } from '@/db/tables/invoiceConfigurationTable';
import type { Tx } from '@/db/types';
import type { InvoiceConfigurationPersistSchema } from '@/components/invoice-configuration-form/invoiceConfigurationFormSchemas';
import type { TranslationFn } from '@/translations/types';
import { ServerError } from '@/utils/serverFnsUtils';

type SetupInvoiceConfigurationParams = {
	tx: Tx;
	t: TranslationFn;
	userId: string;
	invoiceConfiguration: InvoiceConfigurationPersistSchema | undefined;
};
export const setupInvoiceConfiguration = async ({
	tx,
	t,
	userId,
	invoiceConfiguration,
}: SetupInvoiceConfigurationParams) => {
	if (!invoiceConfiguration) {
		return;
	}

	const existingInvoiceConfiguration =
		await tx.query.invoiceConfigurationTable.findFirst({
			where: {
				userId,
			},
			columns: {
				id: true,
			},
		});

	if (existingInvoiceConfiguration) {
		throw new ServerError({
			message: t('contracts.invoiceConfigurationSetup.alreadyExistsForUser'),
		});
	}

	await tx.insert(invoiceConfigurationTable).values({
		userId,
		prefix: invoiceConfiguration.prefix,
		suffix: invoiceConfiguration.suffix,
		withYear: invoiceConfiguration.withYear,
		withMonth: invoiceConfiguration.withMonth,
		withDay: invoiceConfiguration.withDay,
		withCompanyName: invoiceConfiguration.withCompanyName,
		lastInvoiceNumber: invoiceConfiguration.lastInvoiceNumber,
	});
};
