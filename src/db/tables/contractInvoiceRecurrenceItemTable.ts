import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { contractInvoiceRecurrenceIdColumn } from './contractInvoiceRecurrenceTable';

export const contractInvoiceRecurrenceItemTable = s.sqliteTable(
	'contractInvoiceRecurrenceItem',
	{
		id: u.idColumn(),

		dayOfMonth: s.integer({ mode: 'number' }).notNull(),
		percentage: s.integer({ mode: 'number' }).notNull(),

		contractInvoiceRecurrenceId: contractInvoiceRecurrenceIdColumn(),
		createdAt: u.createdAtColumn(),
		updatedAt: u.updatedAtColumn(),
	},
);
