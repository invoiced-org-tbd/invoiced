import { accountFormSchema } from '@/routes/_auth/app/settings/-lib/settings-account-tab/accountFormSchemas';
import { db } from '@/db/client';
import { userTable } from '@/db/tables/userTable';
import { getServerT } from '@/utils/languageUtils';
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
import { authQueryKeys } from '../auth/authApiUtils';
import { userQueryKeys } from './userApiUtils';
import { sessionMiddleware } from '../sessionMiddleware';

const updateUserAccountParams = accountFormSchema.clone();
type UpdateUserAccountParams = z.infer<typeof updateUserAccountParams>;

const updateUserAccountServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(updateUserAccountParams)
	.handler(async ({ data, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			await db
				.update(userTable)
				.set({
					name: data.name,
				})
				.where(eq(userTable.id, user.id));

			return createSuccessResponse({
				message: t('auth.server.accountUpdatedSuccess'),
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
