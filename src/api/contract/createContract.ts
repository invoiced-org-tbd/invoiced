import { contractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import type z from 'zod';
import { ensureAuthSessionServerFn } from '../auth/ensureAuthSession';
import { db } from '@/db/client';
import {
	contractAutoSendConfigurationItemTable,
	contractAutoSendConfigurationTable,
	contractClientTable,
	contractRoleTable,
	contractTable,
} from '@/db/tables';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import { contractQueryKeys } from './contractApiUtils';

const createContractParams = contractsUpsertFormSchema.clone();

type CreateContractParams = z.infer<typeof createContractParams>;

const createContractServerFn = createServerFn({
	method: 'POST',
})
	.inputValidator(createContractParams)
	.handler(async ({ data }) => {
		try {
			const {
				data: { user },
			} = await ensureAuthSessionServerFn();

			const contract = await db.transaction(async (tx) => {
				const [contract] = await tx
					.insert(contractTable)
					.values({
						userId: user.id,
						description: data.description,
					})
					.returning();

				const [role] = await tx
					.insert(contractRoleTable)
					.values({
						contractId: contract.id,
						description: data.role.description,
						rate: data.role.rate,
					})
					.returning();

				const [client] = await tx
					.insert(contractClientTable)
					.values({
						contractId: contract.id,
						companyName: data.client.companyName,
						responsibleName: data.client.responsibleName,
						responsibleEmail: data.client.responsibleEmail,
					})
					.returning();

				const [autoSendConfiguration] = await tx
					.insert(contractAutoSendConfigurationTable)
					.values({
						contractId: contract.id,
						enabled: data.autoSendConfiguration.enabled,
					})
					.returning();

				const autoSendConfigurationItemsValues = [];
				for (const item of data.autoSendConfiguration.items) {
					autoSendConfigurationItemsValues.push({
						contractAutoSendConfigurationId: autoSendConfiguration.id,
						dayOfMonth: item.dayOfMonth,
						percentage: item.percentage,
					});
				}

				const autoSendConfigurationItems = await tx
					.insert(contractAutoSendConfigurationItemTable)
					.values(autoSendConfigurationItemsValues)
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

export type CreateContractResponse = ExtractServerFnData<
	typeof createContractServerFn
>;

export const createContractMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: CreateContractParams) =>
			createContractServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [contractQueryKeys.base()],
			});
		},
	});
