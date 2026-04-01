import * as s from 'drizzle-orm/sqlite-core';
import { contractTable, contractTableColumns } from './contractTable';
import { invoiceIdColumn } from './invoiceTable';

export const contractSnapshotTable = s.sqliteTable('contractSnapshot', {
	...contractTableColumns(),

	invoiceId: invoiceIdColumn(),
	originalContractId: s
		.text()
		.references(() => contractTable.id, { onDelete: 'set null' }),
});

export const contractSnapshotIdColumn = () =>
	s
		.text()
		.notNull()
		.references(() => contractSnapshotTable.id, { onDelete: 'cascade' });
