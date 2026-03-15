import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';

export const companyTable = s.sqliteTable('company', {
	id: u.idColumn(),

	name: s.text().notNull(),
	email: s.text().notNull(),

	userId: userIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});

export const companyIdColumn = () =>
	s
		.text()
		.notNull()
		.references(() => companyTable.id, { onDelete: 'cascade' });
