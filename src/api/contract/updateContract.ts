import { db } from '@/db/client';
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
import { contractQueryKeys } from './contractApiUtils';
import { getServerT } from '@/utils/languageUtils';
import { upsertAutoSendConfigurationItems } from './helpers/upsertAutoSendConfigurationItems';
import { sessionMiddleware } from '../sessionMiddleware';

const updateContractParams = z.object({
	editId: z.string(),
	data: contractsUpsertFormSchema,
});

export type UpdateContractParams = z.infer<typeof updateContractParams>;

const updateContractServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(updateContractParams)
	.handler(async ({ data: { data, editId }, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			await db.transaction(async (tx) => {
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

				await tx
					.update(contractRoleTable)
					.set({
						description: data.role.description,
						rate: data.role.rate,
					})
					.where(eq(contractRoleTable.contractId, contract.id));

				await tx
					.update(contractClientTable)
					.set({
						companyName: data.client.companyName,
						responsibleName: data.client.responsibleName,
						responsibleEmail: data.client.responsibleEmail,
					})
					.where(eq(contractClientTable.contractId, contract.id));

				const [autoSendConfiguration] = await tx
					.update(contractAutoSendConfigurationTable)
					.set({
						enabled: data.autoSendConfiguration.enabled,
					})
					.where(eq(contractAutoSendConfigurationTable.contractId, contract.id))
					.returning();

				await upsertAutoSendConfigurationItems({
					tx,
					t,
					autoSendConfigurationId: autoSendConfiguration.id,
					configuration: data.autoSendConfiguration,
					deletePreviousItems: true,
				});
			});

			return createSuccessResponse();
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
