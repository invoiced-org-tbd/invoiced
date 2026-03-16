import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { contractIdColumn } from './contractTable';

export const contractAutoSendConfigurationTable = s.sqliteTable(
	'contractAutoSendConfiguration',
	{
		id: u.idColumn(),

		enabled: s.integer({ mode: 'boolean' }).notNull().default(false),
		
		contractId: contractIdColumn(),
		createdAt: u.createdAtColumn(),
		updatedAt: u.updatedAtColumn(),
	},
);

export const contractAutoSendConfigurationIdColumn = () =>
	s
		.text()
		.notNull()
		.references(() => contractAutoSendConfigurationTable.id, {
			onDelete: 'cascade',
		});
