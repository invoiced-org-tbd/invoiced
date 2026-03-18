import { contractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import type z from 'zod';
import { db } from '@/db/client';
import {
	contractAutoSendConfigurationTable,
	contractClientTable,
	contractRoleTable,
	contractTable,
} from '@/db/tables';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import { getServerT } from '@/utils/languageUtils';
import { contractQueryKeys } from './contractApiUtils';
import { upsertAutoSendConfigurationItems } from './helpers/upsertAutoSendConfigurationItems';
import { sessionMiddleware } from '../sessionMiddleware';

const createContractParams = contractsUpsertFormSchema.clone();

type CreateContractParams = z.infer<typeof createContractParams>;

const createContractServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(createContractParams)
	.handler(async ({ data, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			await db.transaction(async (tx) => {
				const [contract] = await tx
					.insert(contractTable)
					.values({
						userId: user.id,
						description: data.general.description,
					})
					.returning();

				await tx.insert(contractRoleTable).values({
					contractId: contract.id,
					description: data.role.description,
					rate: data.role.rate,
				});

				await tx.insert(contractClientTable).values({
					contractId: contract.id,
					companyName: data.client.companyName,
					responsibleName: data.client.responsibleName,
					responsibleEmail: data.client.responsibleEmail,
				});

				const [autoSendConfiguration] = await tx
					.insert(contractAutoSendConfigurationTable)
					.values({
						contractId: contract.id,
						enabled: data.autoSendConfiguration.enabled,
					})
					.returning();

				await upsertAutoSendConfigurationItems({
					tx,
					t,
					autoSendConfigurationId: autoSendConfiguration.id,
					configuration: data.autoSendConfiguration,
				});
			});

			return createSuccessResponse();
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
