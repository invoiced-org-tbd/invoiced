import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';

export const invoiceTable = s.sqliteTable('invoice', {
	id: u.idColumn(),

	issueDate: s.integer({ mode: 'timestamp' }).notNull(),

	userId: userIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});

export const invoiceIdColumn = () =>
	u.idColumn().references(() => invoiceTable.id, { onDelete: 'cascade' });
