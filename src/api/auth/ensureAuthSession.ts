import { auth } from '@/lib/auth';
import { createSuccessResponse } from '@/utils/serverFnsUtils';
import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

export const ensureAuthSessionServerFn = createServerFn({
	method: 'GET',
}).handler(async () => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });

	if (!session) {
		throw redirect({ to: '/', replace: true });
	}

	return createSuccessResponse({ data: session });
});
