import { createMiddleware } from '@tanstack/react-start';
import { ensureAuthSessionServerFn } from './auth/ensureAuthSession';

export const sessionMiddleware = createMiddleware().server(async ({ next }) => {
	const session = await ensureAuthSessionServerFn();

	return next({
		context: {
			...session.data,
		},
	});
});
