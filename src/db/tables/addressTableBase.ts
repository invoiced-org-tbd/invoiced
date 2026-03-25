import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import type { BaseCountry } from '@/lib/countries';
import z from 'zod';

// countries are defined here to avoid circular dependencies
export const countries = [
	{
		name: 'countries.unitedStates',
		code: 'us',
		currencyCode: 'USD',
	},
	{
		name: 'countries.brazil',
		code: 'br',
		currencyCode: 'BRL',
	},
	{
		name: 'countries.canada',
		code: 'ca',
		currencyCode: 'CAD',
	},
	{
		name: 'countries.australia',
		code: 'au',
		currencyCode: 'AUD',
	},
	{
		name: 'countries.unitedKingdom',
		code: 'gb',
		currencyCode: 'GBP',
	},
	{
		name: 'countries.argentina',
		code: 'ar',
		currencyCode: 'ARS',
	},
	{
		name: 'countries.portugal',
		code: 'pt',
		currencyCode: 'EUR',
	},
	{
		name: 'countries.mexico',
		code: 'mx',
		currencyCode: 'MXN',
	},
	{
		name: 'countries.germany',
		code: 'de',
		currencyCode: 'EUR',
	},
	{
		name: 'countries.estonia',
		code: 'ee',
		currencyCode: 'EUR',
	},
	{
		name: 'countries.austria',
		code: 'at',
		currencyCode: 'EUR',
	},
	{
		name: 'countries.lithuania',
		code: 'lt',
		currencyCode: 'EUR',
	},
	{
		name: 'countries.netherlands',
		code: 'nl',
		currencyCode: 'EUR',
	},
] as const satisfies BaseCountry[];

export type Country = (typeof countries)[number];

export const countryCodes = countries.map((country) => country.code);
export const countryCodeEnumSchema = z.enum(countryCodes);
export type CountryCode = z.infer<typeof countryCodeEnumSchema>;

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
