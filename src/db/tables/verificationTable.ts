import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';

export const verificationTable = s.sqliteTable(
	'verification',
	{
		id: u.idColumn(),

		identifier: s.text().notNull(),
		value: s.text().notNull(),
		expiresAt: s.integer({ mode: 'timestamp_ms' }).notNull(),

		createdAt: u.createdAtColumn(),
		updatedAt: u.updatedAtColumn(),
	},
	(table) => [
		s
			.uniqueIndex('verification_identifier_value_uidx')
			.on(table.identifier, table.value),
		s.index('verification_expiresAt_idx').on(table.expiresAt),
	],
);
