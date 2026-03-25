import { db } from '@/db/client';
import { getServerT } from '@/utils/languageUtils';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { contractQueryKeys } from './contractApiUtils';
import { sessionMiddleware } from '../sessionMiddleware';

const getEditContractByIdParams = z.object({
	id: z.string(),
});

export type GetEditContractByIdParams = z.infer<
	typeof getEditContractByIdParams
>;

const getEditContractByIdServerFn = createServerFn({
	method: 'GET',
})
	.middleware([sessionMiddleware])
	.inputValidator(getEditContractByIdParams)
	.handler(async ({ data, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			const contract = await db.query.contractTable.findFirst({
				where: {
					id: data.id,
					userId: user.id,
				},
				with: {
					role: true,
					client: {
						with: {
							address: true,
						},
					},
				},
			});

			if (!contract) {
				return createSuccessResponse({
					data: null,
					message: t('entity.notFound', {
						entity: t('contracts.name'),
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
	});

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
