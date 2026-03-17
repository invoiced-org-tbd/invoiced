import { accountFormSchema } from '@/components/account-drawer/account-drawer-form/accountFormSchemas';
import { db } from '@/db/client';
import { userTable } from '@/db/tables';
import { getServerT } from '@/utils/languageUtils';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { eq } from 'drizzle-orm';
import type z from 'zod';
import { authQueryKeys } from '../auth/authApiUtils';
import { ensureAuthSessionServerFn } from '../auth/ensureAuthSession';
import { userQueryKeys } from './userApiUtils';

const updateUserAccountParams = accountFormSchema.clone();
type UpdateUserAccountParams = z.infer<typeof updateUserAccountParams>;

const updateUserAccountServerFn = createServerFn({
	method: 'POST',
})
	.inputValidator(updateUserAccountParams)
	.handler(async ({ data }) => {
		try {
			const {
				data: { user: sessionUser, language },
			} = await ensureAuthSessionServerFn();
			const t = getServerT(language);

			const [user] = await db
				.update(userTable)
				.set({
					name: data.name,
				})
				.where(eq(userTable.id, sessionUser.id))
				.returning();

			return createSuccessResponse({
				data: user,
				message: t('auth.server.accountUpdatedSuccess'),
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export type UpdateUserAccountResponse = ExtractServerFnData<
	typeof updateUserAccountServerFn
>;

export const updateUserAccountMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: UpdateUserAccountParams) =>
			updateUserAccountServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [authQueryKeys.session(), userQueryKeys.base()],
			});
		},
	});
