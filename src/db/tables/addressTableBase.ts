import type { CountryCode } from '@/lib/countries';
import { countryCodes } from '@/lib/countries';
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
	country: s
		.text({
			enum: countryCodes as [CountryCode, ...CountryCode[]],
		})
		.notNull(),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
