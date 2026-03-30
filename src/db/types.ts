import type { ResultSet } from '@libsql/client';
import type { SQLiteTransaction } from 'drizzle-orm/sqlite-core';
import type * as dbTables from './tables/dbTables';

export type Tx = SQLiteTransaction<'async', ResultSet, typeof dbTables>;
