import { auth } from '@/lib/auth';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { authQueryKeys, SESSION_STALE_TIME } from './authApiUtils';

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

export type GetAuthSessionResponse = ExtractServerFnData<
	typeof getAuthSessionServerFn
>;

export const getAuthSessionQueryOptions = () =>
	createQueryOptions({
		queryKey: authQueryKeys.session(),
		queryFn: () => getAuthSessionServerFn(),
		staleTime: SESSION_STALE_TIME,
		gcTime: SESSION_STALE_TIME,
	});
