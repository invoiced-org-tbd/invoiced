import { defineRelations } from 'drizzle-orm';
import * as dbTables from './tables/dbTables';

export const relations = defineRelations(dbTables, (r) => ({
	companyTable: {
		owner: r.one.userTable({
			from: r.companyTable.userId,
			to: r.userTable.id,
			optional: false,
		}),
		address: r.one.companyAddressTable({
			from: r.companyTable.id,
			to: r.companyAddressTable.companyId,
			optional: false,
		}),
	},

	userTable: {
		contracts: r.many.contractTable({
			from: r.userTable.id,
			to: r.contractTable.userId,
		}),
		invoiceConfiguration: r.one.invoiceConfigurationTable({
			from: r.userTable.id,
			to: r.invoiceConfigurationTable.userId,
			optional: false,
		}),
	},

	contractTable: {
		client: r.one.contractClientTable({
			from: r.contractTable.id,
			to: r.contractClientTable.contractId,
			optional: false,
		}),
		role: r.one.contractRoleTable({
			from: r.contractTable.id,
			to: r.contractRoleTable.contractId,
			optional: false,
		}),
		invoiceRecurrence: r.one.contractInvoiceRecurrenceTable({
			from: r.contractTable.id,
			to: r.contractInvoiceRecurrenceTable.contractId,
			optional: false,
		}),
	},

	contractInvoiceRecurrenceTable: {
		items: r.many.contractInvoiceRecurrenceItemTable({
			from: r.contractInvoiceRecurrenceTable.id,
			to: r.contractInvoiceRecurrenceItemTable.contractInvoiceRecurrenceId,
		}),
	},

	contractClientTable: {
		address: r.one.contractClientAddressTable({
			from: r.contractClientTable.id,
			to: r.contractClientAddressTable.contractClientId,
			optional: false,
		}),
	},
}));
