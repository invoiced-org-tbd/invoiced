import '@tanstack/react-start/server-only';

import type { Tx } from '@/db/client';
import { contractAutoSendConfigurationItemTable } from '@/db/tables';
import type { ContractAutoSendConfigurationForm } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import type { TranslationFn } from '@/translations/types';
import { ServerError } from '@/utils/serverFnsUtils';
import { eq } from 'drizzle-orm';

export type UpsertAutoSendConfigurationItemsParams = {
	tx: Tx;
	t: TranslationFn;
	configuration: ContractAutoSendConfigurationForm;
	autoSendConfigurationId: string;
	deletePreviousItems?: boolean;
};
export const upsertAutoSendConfigurationItems = async ({
	tx,
	t,
	autoSendConfigurationId,
	configuration,
	deletePreviousItems,
}: UpsertAutoSendConfigurationItemsParams) => {
	if (deletePreviousItems) {
		await tx
			.delete(contractAutoSendConfigurationItemTable)
			.where(
				eq(
					contractAutoSendConfigurationItemTable.contractAutoSendConfigurationId,
					autoSendConfigurationId,
				),
			);
	}

	if (configuration.enabled) {
		if (!configuration.items.length) {
			throw new ServerError({
				message: t(
					'contracts.form.autoSendConfiguration.atLeastOneItemRequired',
				),
			});
		}

		await tx.insert(contractAutoSendConfigurationItemTable).values(
			configuration.items.map((item) => ({
				contractAutoSendConfigurationId: autoSendConfigurationId,
				dayOfMonth: item.dayOfMonth,
				percentage: item.percentage,
			})),
		);
	}
};
