import * as s from 'drizzle-orm/sqlite-core';
import {
	invoiceConfigurationTable,
	invoiceConfigurationTableColumns,
} from './invoiceConfigurationTable';
import { invoiceIdColumn } from './invoiceTable';
import { userIdColumn } from './userTable';

export const invoiceConfigurationSnapshotTable = s.sqliteTable(
	'invoiceConfigurationSnapshot',
	{
		...invoiceConfigurationTableColumns(),

		userId: userIdColumn(),
		invoiceId: invoiceIdColumn(),
		originalInvoiceConfigurationId: s
			.text()
			.references(() => invoiceConfigurationTable.id, { onDelete: 'set null' }),
	},
);
