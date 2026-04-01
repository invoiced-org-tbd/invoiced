import '@tanstack/react-start/server-only';

import { contractInvoiceRecurrenceItemTable } from '@/db/tables/contractInvoiceRecurrenceItemTable';
import type { Tx } from '@/db/types';
import type { ContractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';

type CreateContractInvoiceRecurrenceItemsParams = {
	tx: Tx;
	recurrenceId: string;
	items: ContractsUpsertFormSchema['invoiceRecurrence']['items'];
};
export const createContractInvoiceRecurrenceItems = async ({
	tx,
	recurrenceId,
	items,
}: CreateContractInvoiceRecurrenceItemsParams) => {
	await tx.insert(contractInvoiceRecurrenceItemTable).values(
		items.map((item) => ({
			contractInvoiceRecurrenceId: recurrenceId,
			dayOfMonth: item.dayOfMonth,
			percentage: item.percentage,
		})),
	);
};
