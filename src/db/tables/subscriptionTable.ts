import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';

export const subscriptionTable = s.sqliteTable(
	'subscription',
	{
		id: u.idColumn(),
		userId: userIdColumn(),
		plan: s.text({ enum: ['starter', 'pro'] }).notNull(),
		status: s
			.text({ enum: ['active', 'cancelled', 'past_due', 'trialing'] })
			.notNull(),
		abacateSubscriptionId: s.text(),
		abacateCustomerId: s.text(),
		currentPeriodEnd: s.integer({ mode: 'timestamp_ms' }),
		trialEndsAt: s.integer({ mode: 'timestamp_ms' }),
		createdAt: u.createdAtColumn(),
		updatedAt: u.updatedAtColumn(),
	},
	(table) => [s.uniqueIndex('subscription_userId_uidx').on(table.userId)],
);
