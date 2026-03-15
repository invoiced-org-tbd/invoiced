import { drizzle } from 'drizzle-orm/libsql';
import { envServer } from '@/lib/envServer';
import { relations } from './relations';
import * as schema from './tables';

export const db = drizzle({
	connection: {
		url: envServer.TURSO_DATABASE_URL,
		authToken: envServer.TURSO_AUTH_TOKEN,
	},
	schema,
	relations,
});
