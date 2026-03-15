import { auth } from '@/lib/auth';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { authQueryKeys, SESSION_STALE_TIME } from './authApiUtils';
import { queryOptions } from '@tanstack/react-query';
import { handleQueryFn } from '@/utils/queryOptionsUtils';

const getAuthSessionServerFn = createServerFn({ method: 'GET' }).handler(
	async () => {
		const headers = getRequestHeaders();
		try {
			const session = await auth.api.getSession({ headers });

			return createSuccessResponse({ data: session });
		} catch (error) {
			throw createErrorResponse({ error });
		}
	},
);

export const getAuthSessionQueryOptions = () =>
	queryOptions({
		queryKey: authQueryKeys.session(),
		queryFn: () => handleQueryFn(() => getAuthSessionServerFn()),
		staleTime: SESSION_STALE_TIME,
		gcTime: SESSION_STALE_TIME,
	});
