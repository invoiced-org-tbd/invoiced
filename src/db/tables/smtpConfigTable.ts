import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';

export const smtpConfigTable = s.sqliteTable('smtp_config', {
	id: u.idColumn(),

	name: s.text().notNull(),
	host: s.text().notNull(),
	port: s.integer().notNull(),
	security: s.text({ enum: ['none', 'ssl_tls', 'starttls'] }).notNull(),
	username: s.text().notNull(),
	password: s.text().notNull(),
	fromName: s.text(),
	fromEmail: s.text().notNull(),

	userId: userIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});

export const smtpConfigIdColumn = () =>
	s
		.text()
		.notNull()
		.references(() => smtpConfigTable.id, { onDelete: 'restrict' });
