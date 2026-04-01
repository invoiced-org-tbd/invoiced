import * as s from 'drizzle-orm/sqlite-core';
import { addressTableBaseColumns } from './addressTableBase';
import { contractClientIdColumn } from './contractClientTable';

export const contractClientAddressTableColumns = () => ({
	...addressTableBaseColumns(),
});

export const contractClientAddressTable = s.sqliteTable(
	'contractClientAddress',
	{
		...contractClientAddressTableColumns(),
		contractClientId: contractClientIdColumn(),
	},
);
