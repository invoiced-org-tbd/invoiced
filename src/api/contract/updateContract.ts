import { db } from '@/db/client';
import { contractAutoSendConfigurationItemTable } from '@/db/tables/contractAutoSendConfigurationItemTable';
import { contractAutoSendConfigurationTable } from '@/db/tables/contractAutoSendConfigurationTable';
import { contractClientTable } from '@/db/tables/contractClientTable';
import { contractRoleTable } from '@/db/tables/contractRoleTable';
import { contractTable } from '@/db/tables/contractTable';
import { contractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
	ServerError,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { and, eq } from 'drizzle-orm';
import z from 'zod';
import { ensureAuthSessionServerFn } from '../auth/ensureAuthSession';
import { contractQueryKeys } from './contractApiUtils';
import { getServerT } from '@/translations/server';

const updateContractParams = z.object({
	editId: z.string(),
	data: contractsUpsertFormSchema,
});

export type UpdateContractParams = z.infer<typeof updateContractParams>;

const updateContractServerFn = createServerFn({
	method: 'POST',
})
	.inputValidator(updateContractParams)
	.handler(async ({ data: { data, editId } }) => {
		try {
			const {
				data: { user, locale },
			} = await ensureAuthSessionServerFn();
			const t = getServerT(locale);

			const contract = await db.transaction(async (tx) => {
				const [contract] = await tx
					.update(contractTable)
					.set({
						description: data.general.description,
					})
					.where(
						and(
							eq(contractTable.id, editId),
							eq(contractTable.userId, user.id),
						),
					)
					.returning();

				if (!contract) {
					throw new ServerError({
						message: t('entity.notFound', {
							entity: t('contracts.name'),
						}),
					});
				}

				const [role] = await tx
					.update(contractRoleTable)
					.set({
						description: data.role.description,
						rate: data.role.rate,
					})
					.where(eq(contractRoleTable.contractId, editId))
					.returning();

				const [client] = await tx
					.update(contractClientTable)
					.set({
						companyName: data.client.companyName,
						responsibleName: data.client.responsibleName,
						responsibleEmail: data.client.responsibleEmail,
					})
					.where(eq(contractClientTable.contractId, editId))
					.returning();

				const [autoSendConfiguration] = await tx
					.update(contractAutoSendConfigurationTable)
					.set({
						enabled: data.autoSendConfiguration.enabled,
					})
					.where(eq(contractAutoSendConfigurationTable.contractId, editId))
					.returning();

				await tx
					.delete(contractAutoSendConfigurationItemTable)
					.where(
						eq(
							contractAutoSendConfigurationItemTable.contractAutoSendConfigurationId,
							autoSendConfiguration.id,
						),
					);

				const autoSendConfigurationItems = await tx
					.insert(contractAutoSendConfigurationItemTable)
					.values(
						data.autoSendConfiguration.items.map((item) => ({
							contractAutoSendConfigurationId: autoSendConfiguration.id,
							dayOfMonth: item.dayOfMonth,
							percentage: item.percentage,
						})),
					)
					.returning();

				return {
					contract,
					role,
					client,
					autoSendConfiguration: {
						...autoSendConfiguration,
						items: autoSendConfigurationItems,
					},
				};
			});

			return createSuccessResponse({
				data: contract,
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export type UpdateContractResponse = ExtractServerFnData<
	typeof updateContractServerFn
>;

export const updateContractMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: UpdateContractParams) =>
			updateContractServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [contractQueryKeys.base()],
			});
		},
	});
