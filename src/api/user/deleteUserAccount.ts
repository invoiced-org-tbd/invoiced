import { auth } from '@/lib/auth';
import { createMutationOptions } from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { sessionMiddleware } from '../sessionMiddleware';

const deleteUserAccountServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.handler(async () => {
		try {
			const headers = getRequestHeaders();

			await auth.api.deleteUser({
				headers,
				body: {},
			});

			return createSuccessResponse();
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export type DeleteUserAccountResponse = ExtractServerFnData<
	typeof deleteUserAccountServerFn
>;

export const deleteUserAccountMutationOptions = () =>
	createMutationOptions({
		mutationFn: () => deleteUserAccountServerFn(),
	});
