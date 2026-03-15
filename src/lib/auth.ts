import { db } from '@/db/client';
import {
	accountTable,
	sessionTable,
	userTable,
	verificationTable,
} from '@/db/tables';
import { envServer } from '@/lib/envServer';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { tanstackStartCookies } from 'better-auth/tanstack-start';

export const auth = betterAuth({
	baseURL: envServer.BETTER_AUTH_URL,
	secret: envServer.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema: {
			user: userTable,
			account: accountTable,
			session: sessionTable,
			verification: verificationTable,
		},
	}),
	socialProviders: {
		google: {
			clientId: envServer.GOOGLE_CLIENT_ID,
			clientSecret: envServer.GOOGLE_CLIENT_SECRET,
		},
	},
	plugins: [tanstackStartCookies()],
	user: {
		deleteUser: {
			enabled: true,
		},
	},
});
