import '@tanstack/react-start/server-only';

import { contractClientTable } from '@/db/tables/contractClientTable';
import { contractInvoiceRecurrenceTable } from '@/db/tables/contractInvoiceRecurrenceTable';
import { contractRoleTable } from '@/db/tables/contractRoleTable';
import { contractTable } from '@/db/tables/contractTable';
import type { Tx } from '@/db/types';
import type { ContractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import type { TranslationFn } from '@/translations/types';
import { createContractAddress } from './createContractAddress';
import { createContractInvoiceRecurrenceItems } from './createContractInvoiceRecurrenceItems';
import { setupContractCreateAutoSend } from './setupContractCreateAutoSend';

type CreateContractParams = {
	tx: Tx;
	userId: string;
	form: ContractsUpsertFormSchema;
	t: TranslationFn;
};
export const createContract = async ({
	tx,
	userId,
	form,
	t,
}: CreateContractParams) => {
	const [contract] = await tx
		.insert(contractTable)
		.values({
			userId,
		})
		.returning({ id: contractTable.id });

	await tx.insert(contractRoleTable).values({
		contractId: contract.id,
		description: form.role.description,
		rate: form.role.rate,
	});

	const [contractClient] = await tx
		.insert(contractClientTable)
		.values({
			contractId: contract.id,
			companyName: form.client.companyName,
			responsibleName: form.client.responsibleName,
			responsibleEmail: form.client.responsibleEmail,
		})
		.returning({ id: contractClientTable.id });

	await createContractAddress({
		tx,
		contractClientId: contractClient.id,
		address: form.client.address,
	});

	const [invoiceRecurrence] = await tx
		.insert(contractInvoiceRecurrenceTable)
		.values({
			contractId: contract.id,
		})
		.returning({ id: contractInvoiceRecurrenceTable.id });

	await createContractInvoiceRecurrenceItems({
		tx,
		recurrenceId: invoiceRecurrence.id,
		items: form.invoiceRecurrence.items,
	});

	await setupContractCreateAutoSend({
		tx,
		contractId: contract.id,
		userId,
		t,
		autoSend: form.autoSend,
	});
};
