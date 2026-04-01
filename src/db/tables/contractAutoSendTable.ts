import * as s from 'drizzle-orm/sqlite-core';
import { contractIdColumn } from './contractTable';
import { emailTemplateIdColumn } from './emailTemplateTable';
import { smtpConfigIdColumn } from './smtpConfigTable';
import * as u from './utils';

export const contractAutoSendTable = s.sqliteTable('contractAutoSend', {
	id: u.idColumn(),

	contractId: contractIdColumn(),
	smtpConfigId: smtpConfigIdColumn(),
	emailTemplateId: emailTemplateIdColumn(),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
