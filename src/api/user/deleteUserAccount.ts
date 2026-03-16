import { auth } from '@/lib/auth';
import { createMutationOptions } from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

const deleteUserAccountServerFn = createServerFn({
	method: 'POST',
}).handler(async () => {
	const headers = getRequestHeaders();

	try {
		await auth.api.deleteUser({
			headers,
			body: {},
		});

		return createSuccessResponse({
			data: null,
			message: 'Account deleted successfully',
		});
	} catch (error) {
		throw createErrorResponse({
			error,
		});
	}
});

export const deleteUserAccountMutationOptions = () =>
	createMutationOptions({
		mutationFn: () => deleteUserAccountServerFn(),
	});
