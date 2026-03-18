import * as s from 'drizzle-orm/sqlite-core';
import { addressTableBaseColumns } from './addressTableBase';
import { companyIdColumn } from './companyTable';

export const companyAddressTable = s.sqliteTable('companyAddress', {
	...addressTableBaseColumns(),
	companyId: companyIdColumn(),
});
