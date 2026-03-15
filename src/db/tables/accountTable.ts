import * as s from 'drizzle-orm/sqlite-core';
import { userIdColumn } from './userTable';
import * as u from './utils';

export const accountTable = s.sqliteTable(
	'account',
	{
		id: u.idColumn(),

		accountId: s.text().notNull(),
		providerId: s.text().notNull(),
		accessToken: s.text(),
		refreshToken: s.text(),
		idToken: s.text(),
		accessTokenExpiresAt: s.integer({
			mode: 'timestamp_ms',
		}),
		refreshTokenExpiresAt: s.integer({
			mode: 'timestamp_ms',
		}),
		scope: s.text(),
		password: s.text(),

		userId: userIdColumn(),
		createdAt: u.createdAtColumn(),
		updatedAt: u.updatedAtColumn(),
	},
	(table) => [s.index('account_userId_idx').on(table.userId)],
);
