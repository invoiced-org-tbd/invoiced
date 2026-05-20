import '@tanstack/react-start/server-only';

import { contractAutoSendTable } from '@/db/tables/contractAutoSendTable';
import type { Tx } from '@/db/types';
import type { ContractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import type { TranslationFn } from '@/translations/types';
import { eq } from 'drizzle-orm';
import { assertCanUseAutoSend } from '@/api/subscription/subscriptionUtils';
import { assertContractAutoSendResourcesOwned } from './assertContractAutoSendResourcesOwned';

type SetupContractUpdateAutoSendParams = {
	tx: Tx;
	contractId: string;
	userId: string;
	t: TranslationFn;
	autoSend: ContractsUpsertFormSchema['autoSend'];
};

export const setupContractUpdateAutoSend = async ({
	tx,
	contractId,
	userId,
	t,
	autoSend,
}: SetupContractUpdateAutoSendParams) => {
	if (!autoSend.enabled) {
		await tx
			.delete(contractAutoSendTable)
			.where(eq(contractAutoSendTable.contractId, contractId));
		return;
	}

	await assertCanUseAutoSend(userId);

	const emailTemplateId = autoSend.emailTemplateId;

	await assertContractAutoSendResourcesOwned({
		tx,
		userId,
		emailTemplateId,
		t,
	});

	const existingAutoSend = await tx.query.contractAutoSendTable.findFirst({
		where: {
			contractId,
		},
	});

	if (existingAutoSend) {
		await tx
			.update(contractAutoSendTable)
			.set({
				emailTemplateId,
			})
			.where(eq(contractAutoSendTable.contractId, contractId));
	} else {
		await tx.insert(contractAutoSendTable).values({
			contractId,
			emailTemplateId,
		});
	}
};
