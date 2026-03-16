import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { companyIdColumn } from './companyTable';

export const contractTable = s.sqliteTable('contract', {
	id: u.idColumn(),

	description: s.text().notNull(),

	companyId: companyIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});

export const contractIdColumn = () =>
	s
		.text()
		.notNull()
		.references(() => contractTable.id, { onDelete: 'cascade' });
