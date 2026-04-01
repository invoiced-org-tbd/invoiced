import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { contractIdColumn } from './contractTable';

export const contractClientTableColumns = () => ({
	id: u.idColumn(),

	companyName: s.text().notNull(),
	responsibleName: s.text().notNull(),
	responsibleEmail: s.text().notNull(),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});

export const contractClientTable = s.sqliteTable('contractClient', {
	...contractClientTableColumns(),

	contractId: contractIdColumn(),
});

export const contractClientIdColumn = () =>
	s
		.text()
		.notNull()
		.references(() => contractClientTable.id, { onDelete: 'cascade' });
