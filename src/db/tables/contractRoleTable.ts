import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { contractIdColumn } from './contractTable';

export const contractRoleTable = s.sqliteTable('contractRole', {
	id: u.idColumn(),

	description: s.text().notNull(),
	rate: s.integer({ mode: 'number' }).notNull(),
	email: s.text().notNull(),

	contractId: contractIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
