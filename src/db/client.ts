import '@tanstack/react-start/server-only';

import { drizzle } from 'drizzle-orm/libsql';
import { envServer } from '@/lib/envServer';
import { relations } from './relations';
import * as schema from './tables';
import type { SQLiteTransaction } from 'drizzle-orm/sqlite-core';
import type { ResultSet } from '@libsql/client';

export const db = drizzle({
	connection: {
		url: envServer.TURSO_DATABASE_URL,
		authToken: envServer.TURSO_AUTH_TOKEN,
	},
	schema,
	relations,
});

export type Db = typeof db;
export type Tx = SQLiteTransaction<'async', ResultSet, typeof schema>;
