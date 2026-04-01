import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { contractIdColumn } from './contractTable';

export const contractRoleTableColumns = () => ({
	id: u.idColumn(),

	description: s.text().notNull(),
	rate: s.integer({ mode: 'number' }).notNull(),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});

export const contractRoleTable = s.sqliteTable('contractRole', {
	...contractRoleTableColumns(),

	contractId: contractIdColumn(),
});
