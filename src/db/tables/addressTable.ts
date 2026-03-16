import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';

export const addressOwnerTypeValues = ['company', 'contractClient'] as const;

export const addressTable = s.sqliteTable(
	'address',
	{
		id: u.idColumn(),

		addressableType: s.text({ enum: addressOwnerTypeValues }).notNull(),
		addressableId: s.text().notNull(),

		street1: s.text().notNull(),
		street2: s.text(),
		number: s.text().notNull(),
		postalCode: s.text().notNull(),
		city: s.text().notNull(),
		state: s.text().notNull(),
		country: s.text().notNull(),

		createdAt: u.createdAtColumn(),
		updatedAt: u.updatedAtColumn(),
	},
	(table) => [
		s
			.uniqueIndex('address_addressableType_addressableId_uidx')
			.on(table.addressableType, table.addressableId),
	],
);
