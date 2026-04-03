import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { invoiceIdColumn } from './invoiceTable';

export const invoiceItemsTable = s.sqliteTable('invoiceItems', {
	id: u.idColumn(),

	description: s.text().notNull(),
	amount: s.integer({ mode: 'number' }).notNull(),

	invoiceId: invoiceIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
