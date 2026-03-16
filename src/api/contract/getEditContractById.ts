import { db } from '@/db/client';
import type { ContractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import { getServerT } from '@/translations/server';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import type {
	ExtractServerFnData,
	SuccessResponse,
} from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { ensureAuthSessionServerFn } from '../auth/ensureAuthSession';
import { contractQueryKeys } from './contractApiUtils';

const getEditContractByIdParams = z.object({
	id: z.string(),
});

export type GetEditContractByIdParams = z.infer<
	typeof getEditContractByIdParams
>;

const getEditContractByIdServerFn = createServerFn({
	method: 'GET',
})
	.inputValidator(getEditContractByIdParams)
	.handler(
		async ({
			data,
		}): Promise<SuccessResponse<ContractsUpsertFormSchema | null>> => {
			try {
				const {
					data: { user, locale },
				} = await ensureAuthSessionServerFn();
				const t = getServerT(locale);

				const contract = await db.query.contractTable.findFirst({
					where: {
						id: data.id,
						userId: user.id,
					},
					with: {
						role: true,
						client: true,
						autoSendConfiguration: {
							with: {
								items: true,
							},
						},
					},
				});

				if (!contract) {
					return createSuccessResponse({
						data: null,
						message: t('entity.notFound', {
							entity: t('contracts.title'),
						}),
					});
				}

				return createSuccessResponse({
					data: contract,
				});
			} catch (error) {
				throw createErrorResponse({
					error,
				});
			}
		},
	);

export type GetEditContractByIdResponse = ExtractServerFnData<
	typeof getEditContractByIdServerFn
>;

export const getEditContractByIdQueryOptions = (
	params: GetEditContractByIdParams,
) =>
	createQueryOptions({
		queryKey: contractQueryKeys.getById(params),
		queryFn: () => getEditContractByIdServerFn({ data: params }),
	});
