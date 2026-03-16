import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';

export const contractTable = s.sqliteTable('contract', {
	id: u.idColumn(),

	description: s.text().notNull(),

	userId: userIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});

export const contractIdColumn = () =>
	s
		.text()
		.notNull()
		.references(() => contractTable.id, { onDelete: 'cascade' });
