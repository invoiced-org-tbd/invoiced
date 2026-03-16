import { auth } from '@/lib/auth';
import { createMutationOptions } from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { ensureAuthSessionServerFn } from '../auth/ensureAuthSession';
import { getServerT } from '@/translations/server';

const deleteUserAccountServerFn = createServerFn({
	method: 'POST',
}).handler(async () => {
	try {
		const {
			data: { locale },
		} = await ensureAuthSessionServerFn();
		const t = getServerT(locale);

		const headers = getRequestHeaders();

		await auth.api.deleteUser({
			headers,
			body: {},
		});

		return createSuccessResponse({
			data: null,
			message: t('server.user.accountDeletedSuccess'),
		});
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
