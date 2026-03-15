import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';

export const userTable = s.sqliteTable('user', {
	id: u.idColumn(),

	name: s.text().notNull(),
	email: s.text().notNull().unique(),
	emailVerified: s.integer({ mode: 'boolean' }).notNull().default(false),
	image: s.text(),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});

export const userIdColumn = () =>
	s
		.text()
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' });
