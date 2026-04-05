import '@tanstack/react-start/server-only';

import { contractClientAddressTable } from '@/db/tables/contractClientAddressTable';
import { contractClientTable } from '@/db/tables/contractClientTable';
import { contractInvoiceRecurrenceItemTable } from '@/db/tables/contractInvoiceRecurrenceItemTable';
import { contractRoleTable } from '@/db/tables/contractRoleTable';
import type { Tx } from '@/db/types';
import type { ContractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import type { TranslationFn } from '@/translations/types';
import { ServerError } from '@/utils/serverFnsUtils';
import { eq } from 'drizzle-orm';
import { createContractAddress } from './createContractAddress';
import { createContractInvoiceRecurrenceItems } from './createContractInvoiceRecurrenceItems';
import { setupContractUpdateAutoSend } from './setupContractUpdateAutoSend';

type UpdateContractParams = {
	tx: Tx;
	userId: string;
	contractId: string;
	form: ContractsUpsertFormSchema;
	t: TranslationFn;
};

export const updateContract = async ({
	tx,
	userId,
	contractId,
	form,
	t,
}: UpdateContractParams) => {
	const company = await tx.query.companyTable.findFirst({
		where: {
			userId,
		},
	});

	if (!company) {
		throw new ServerError({
			message: t('contracts.server.companySetupRequiredBeforeUpdate'),
		});
	}

	await tx
		.update(contractRoleTable)
		.set({
			description: form.role.description,
			rate: form.role.rate,
		})
		.where(eq(contractRoleTable.contractId, contractId));

	const [contractClient] = await tx
		.update(contractClientTable)
		.set({
			companyName: form.client.companyName,
			responsibleName: form.client.responsibleName,
			responsibleEmail: form.client.responsibleEmail,
		})
		.where(eq(contractClientTable.contractId, contractId))
		.returning({ id: contractClientTable.id });

	if (!contractClient) {
		throw new ServerError({
			message: t('entity.notFound', {
				entity: t('contracts.name'),
			}),
		});
	}

	await tx
		.delete(contractClientAddressTable)
		.where(eq(contractClientAddressTable.contractClientId, contractClient.id));

	await createContractAddress({
		tx,
		contractClientId: contractClient.id,
		address: form.client.address,
	});

	const invoiceRecurrence =
		await tx.query.contractInvoiceRecurrenceTable.findFirst({
			where: {
				contractId,
			},
		});

	if (!invoiceRecurrence) {
		throw new ServerError({
			message: t('entity.notFound', {
				entity: t('contracts.name'),
			}),
		});
	}

	await tx
		.delete(contractInvoiceRecurrenceItemTable)
		.where(
			eq(
				contractInvoiceRecurrenceItemTable.contractInvoiceRecurrenceId,
				invoiceRecurrence.id,
			),
		);

	await createContractInvoiceRecurrenceItems({
		tx,
		recurrenceId: invoiceRecurrence.id,
		items: form.invoiceRecurrence.items,
	});

	await setupContractUpdateAutoSend({
		tx,
		contractId,
		userId,
		t,
		autoSend: form.autoSend,
	});
};
