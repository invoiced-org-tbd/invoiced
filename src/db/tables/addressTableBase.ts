import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';

export const addressTableBaseColumns = () => ({
	id: u.idColumn(),

	street1: s.text().notNull(),
	street2: s.text(),
	number: s.text().notNull(),
	postalCode: s.text().notNull(),
	city: s.text().notNull(),
	state: s.text().notNull(),
	country: s.text().notNull(),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
