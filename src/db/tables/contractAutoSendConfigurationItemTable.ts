import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { contractAutoSendConfigurationIdColumn } from './contractAutoSendConfigurationTable';

export const contractAutoSendConfigurationItemTable = s.sqliteTable(
	'contractAutoSendConfigurationItem',
	{
		id: u.idColumn(),

		dayOfMonth: s.integer({ mode: 'number' }).notNull(),
		percentage: s.integer({ mode: 'number' }).notNull(),

		contractAutoSendConfigurationId: contractAutoSendConfigurationIdColumn(),
		createdAt: u.createdAtColumn(),
		updatedAt: u.updatedAtColumn(),
	},
);
