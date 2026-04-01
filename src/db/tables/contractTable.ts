import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';

export const contractTableColumns = () => ({
	id: u.idColumn(),

	userId: userIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});

export const contractTable = s.sqliteTable('contract', contractTableColumns);

export const contractIdColumn = () =>
	s
		.text()
		.notNull()
		.references(() => contractTable.id, { onDelete: 'cascade' });
