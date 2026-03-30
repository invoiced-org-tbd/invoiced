import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';

export const emailTemplateTable = s.sqliteTable('email_template', {
	id: u.idColumn(),
	userId: userIdColumn(),
	name: s.text().notNull(),
	slug: s.text().notNull(),
	subject: s.text().notNull(),
	body: s.text().notNull(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
