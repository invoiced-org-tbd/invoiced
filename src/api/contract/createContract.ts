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
	contractClientAddressTable,
	contractClientTable,
	contractRoleTable,
	contractTable,
} from '@/db/tables';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import { contractQueryKeys } from './contractApiUtils';
import { sessionMiddleware } from '../sessionMiddleware';

const createContractParams = contractsUpsertFormSchema.clone();

type CreateContractParams = z.infer<typeof createContractParams>;

const createContractServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(createContractParams)
	.handler(async ({ data, context: { user } }) => {
		try {
			await db.transaction(async (tx) => {
				const [contract] = await tx
					.insert(contractTable)
					.values({
						userId: user.id,
					})
					.returning();

				await tx.insert(contractRoleTable).values({
					contractId: contract.id,
					description: data.role.description,
					rate: data.role.rate,
				});

				const [contractClient] = await tx
					.insert(contractClientTable)
					.values({
						contractId: contract.id,
						companyName: data.client.companyName,
						responsibleName: data.client.responsibleName,
						responsibleEmail: data.client.responsibleEmail,
					})
					.returning();

				await tx.insert(contractClientAddressTable).values({
					contractClientId: contractClient.id,
					street1: data.client.address.street1,
					street2: data.client.address.street2 || null,
					number: data.client.address.number,
					postalCode: data.client.address.postalCode,
					city: data.client.address.city,
					state: data.client.address.state,
					country: data.client.address.country,
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
