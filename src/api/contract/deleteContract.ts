import { db } from '@/db/client';
import { contractTable } from '@/db/tables';
import { getServerT } from '@/translations/server';
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

const deleteContractParams = z.object({
	id: z.string(),
});

export type DeleteContractParams = z.infer<typeof deleteContractParams>;

const deleteContractServerFn = createServerFn({
	method: 'POST',
})
	.inputValidator(deleteContractParams)
	.handler(async ({ data }) => {
		try {
			const {
				data: { user, locale },
			} = await ensureAuthSessionServerFn();
			const t = getServerT(locale);

			const [contract] = await db
				.delete(contractTable)
				.where(
					and(eq(contractTable.id, data.id), eq(contractTable.userId, user.id)),
				)
				.returning();

			if (!contract) {
				throw new ServerError({
					message: t('entity.notFound', {
						entity: t('contracts.name'),
					}),
				});
			}

			return createSuccessResponse({
				data: null,
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
