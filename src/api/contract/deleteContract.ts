import { db } from '@/db/client';
import { contractTable } from '@/db/tables';
import { getServerT } from '@/utils/languageUtils';
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
import { sessionMiddleware } from '../sessionMiddleware';

const deleteContractParams = z.object({
	id: z.string(),
});

export type DeleteContractParams = z.infer<typeof deleteContractParams>;

const deleteContractServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(deleteContractParams)
	.handler(async ({ data, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			const { rowsAffected } = await db
				.delete(contractTable)
				.where(
					and(eq(contractTable.id, data.id), eq(contractTable.userId, user.id)),
				);

			if (rowsAffected === 0) {
				throw new ServerError({
					message: t('entity.notFound', {
						entity: t('contracts.name'),
					}),
				});
			}

			return createSuccessResponse({
				message: t('entity.deletedSuccess', {
					entity: t('contracts.name'),
				}),
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export type DeleteContractResponse = ExtractServerFnData<
	typeof deleteContractServerFn
>;

export const deleteContractMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: DeleteContractParams) =>
			deleteContractServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [contractQueryKeys.base()],
			});
		},
	});
