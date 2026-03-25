import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { contractIdColumn } from './contractTable';

export const contractInvoiceRecurrenceTable = s.sqliteTable(
	'contractInvoiceRecurrence',
	{
		id: u.idColumn(),

		contractId: contractIdColumn(),
		createdAt: u.createdAtColumn(),
		updatedAt: u.updatedAtColumn(),
	},
);

export const contractInvoiceRecurrenceIdColumn = () =>
	s
		.text()
		.notNull()
		.references(() => contractInvoiceRecurrenceTable.id, {
			onDelete: 'cascade',
		});
