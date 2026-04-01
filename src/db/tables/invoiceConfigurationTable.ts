import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';

export const invoiceConfigurationTableColumns = () => ({
	id: u.idColumn(),

	lastInvoiceNumber: s.integer().notNull(),
	prefix: s.text().notNull(),
	suffix: s.text(),
	withYear: s.integer({ mode: 'boolean' }).notNull(),
	withMonth: s.integer({ mode: 'boolean' }).notNull(),
	withDay: s.integer({ mode: 'boolean' }).notNull(),
	withCompanyName: s.integer({ mode: 'boolean' }).notNull(),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});

export const invoiceConfigurationTable = s.sqliteTable('invoiceConfiguration', {
	...invoiceConfigurationTableColumns(),
	userId: userIdColumn().unique(),
});
