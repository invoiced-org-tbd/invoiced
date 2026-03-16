import { auth } from '@/lib/auth';
import { LANGUAGE_COOKIE_NAME, resolveLanguage } from '@/translations/server';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import { createSuccessResponse } from '@/utils/serverFnsUtils';
import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getCookie, getRequestHeaders } from '@tanstack/react-start/server';
import { authQueryKeys, SESSION_STALE_TIME } from './authApiUtils';

export const ensureAuthSessionServerFn = createServerFn({
	method: 'GET',
}).handler(async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });

	if (!session) {
		throw redirect({ to: '/', replace: true });
	}

	const locale = resolveLanguage(getCookie(LANGUAGE_COOKIE_NAME));

	return createSuccessResponse({ data: { ...session, locale } });
});

export const ensureAuthSessionQueryOptions = () =>
	createQueryOptions({
		queryKey: authQueryKeys.session(),
		queryFn: () => ensureAuthSessionServerFn(),
		staleTime: SESSION_STALE_TIME,
		gcTime: SESSION_STALE_TIME,
	});
