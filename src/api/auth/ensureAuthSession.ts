import { auth } from '@/lib/auth';
import { queryOptions } from '@tanstack/react-query';
import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { authQueryKeys, SESSION_STALE_TIME } from './authApiUtils';
import { handleQueryFn } from '@/utils/queryOptionsUtils';
import { createSuccessResponse } from '@/utils/serverFnsUtils';

const ensureAuthSessionServerFn = createServerFn({
	method: 'GET',
}).handler(async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });

	if (!session) {
		throw redirect({ to: '/', replace: true });
	}

	return createSuccessResponse({ data: session });
});

export const ensureAuthSessionQueryOptions = () =>
	queryOptions({
		queryKey: authQueryKeys.session(),
		queryFn: () => handleQueryFn(() => ensureAuthSessionServerFn()),
		staleTime: SESSION_STALE_TIME,
		gcTime: SESSION_STALE_TIME,
	});
