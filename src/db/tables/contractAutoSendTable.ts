import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { contractTable } from './contractTable';
import { emailTemplateTable } from './emailTemplateTable';
import { smtpConfigTable } from './smtpConfigTable';

export const contractAutoSendTable = s.sqliteTable('contractAutoSend', {
	id: u.idColumn(),

	contractId: s
		.text()
		.notNull()
		.unique()
		.references(() => contractTable.id, { onDelete: 'cascade' }),

	smtpConfigId: s
		.text()
		.notNull()
		.references(() => smtpConfigTable.id, { onDelete: 'restrict' }),

	emailTemplateId: s
		.text()
		.notNull()
		.references(() => emailTemplateTable.id, { onDelete: 'restrict' }),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
