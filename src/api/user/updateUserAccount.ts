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
import z from 'zod';
import { selectUser, userQueryKeys } from './userApiUtils';
import { authQueryKeys } from '../auth/authApiUtils';

const updateUserAccountParams = z.object({
	...accountFormSchema.shape,
	...selectUser.pick({
		id: true,
	}).shape,
});
type UpdateUserAccountParams = z.infer<typeof updateUserAccountParams>;

const updateUserAccountServerFn = createServerFn({
	method: 'POST',
})
	.inputValidator(updateUserAccountParams)
	.handler(async ({ data }) => {
		try {
			const [user] = await db
				.update(userTable)
				.set({
					name: data.name,
				})
				.where(eq(userTable.id, data.id))
				.returning();

			return createSuccessResponse({
				data: user,
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
