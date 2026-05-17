import * as s from 'drizzle-orm/sqlite-core';
import { contractIdColumn } from './contractTable';
import { emailTemplateIdColumn } from './emailTemplateTable';
import * as u from './utils';

export const contractAutoSendTable = s.sqliteTable('contractAutoSend', {
	id: u.idColumn(),

	contractId: contractIdColumn(),
	emailTemplateId: emailTemplateIdColumn(),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
