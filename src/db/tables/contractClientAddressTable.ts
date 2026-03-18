import * as s from 'drizzle-orm/sqlite-core';
import { addressTableBaseColumns } from './addressTableBase';
import { contractClientIdColumn } from './contractClientTable';

export const contractClientAddressTable = s.sqliteTable(
	'contractClientAddress',
	{
		...addressTableBaseColumns(),
		contractClientId: contractClientIdColumn(),
	},
);
