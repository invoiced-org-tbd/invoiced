import '@tanstack/react-start/server-only';

import { contractAutoSendTable } from '@/db/tables/contractAutoSendTable';
import type { Tx } from '@/db/types';
import type { ContractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import type { TranslationFn } from '@/translations/types';
import { assertContractAutoSendResourcesOwned } from './assertContractAutoSendResourcesOwned';

type SetupContractCreateAutoSendParams = {
	tx: Tx;
	contractId: string;
	userId: string;
	t: TranslationFn;
	autoSend: ContractsUpsertFormSchema['autoSend'];
};
export const setupContractCreateAutoSend = async ({
	tx,
	contractId,
	userId,
	t,
	autoSend,
}: SetupContractCreateAutoSendParams) => {
	if (!autoSend.enabled) {
		return;
	}

	const smtpConfigId = autoSend.smtpConfigId;
	const emailTemplateId = autoSend.emailTemplateId;

	await assertContractAutoSendResourcesOwned({
		tx,
		userId,
		smtpConfigId,
		emailTemplateId,
		t,
	});

	await tx.insert(contractAutoSendTable).values({
		contractId,
		smtpConfigId,
		emailTemplateId,
	});
};
