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
	(table) => [s.index('verification_identifier_idx').on(table.identifier)],
);
