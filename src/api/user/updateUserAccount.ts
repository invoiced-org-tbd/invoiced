import { accountFormSchema } from '@/components/account-drawer/account-drawer-form/accountFormSchemas';
import { db } from '@/db/client';
import { userTable } from '@/db/tables';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { eq } from 'drizzle-orm';
import type z from 'zod';
import { getServerT } from '@/translations/server';
import { userQueryKeys } from './userApiUtils';
import { authQueryKeys } from '../auth/authApiUtils';
import { ensureAuthSessionServerFn } from '../auth/ensureAuthSession';

const updateUserAccountParams = accountFormSchema.clone();
type UpdateUserAccountParams = z.infer<typeof updateUserAccountParams>;

const updateUserAccountServerFn = createServerFn({
	method: 'POST',
})
	.inputValidator(updateUserAccountParams)
	.handler(async ({ data }) => {
		try {
			const {
				data: { user: sessionUser, locale },
			} = await ensureAuthSessionServerFn();
			const t = getServerT(locale);

			const [user] = await db
				.update(userTable)
				.set({
					name: data.name,
				})
				.where(eq(userTable.id, sessionUser.id))
				.returning();

			return createSuccessResponse({
				data: user,
				message: t('server.user.accountUpdatedSuccess'),
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

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
