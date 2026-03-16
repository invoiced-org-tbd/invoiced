import { defineRelations } from 'drizzle-orm';
import * as tables from './tables';

export const relations = defineRelations(tables, (r) => ({
	companyTable: {
		owner: r.one.userTable({
			from: r.companyTable.userId,
			to: r.userTable.id,
			optional: false,
		}),
		// Polymorphic owner relation (resolved by addressableType at query level).
		address: r.one.addressTable({
			from: r.companyTable.id,
			to: r.addressTable.addressableId,
			optional: true,
		}),
	},

	contractClientTable: {
		// Polymorphic owner relation (resolved by addressableType at query level).
		address: r.one.addressTable({
			from: r.contractClientTable.id,
			to: r.addressTable.addressableId,
			optional: true,
		}),
	},

	userTable: {
		contracts: r.many.contractTable({
			from: r.userTable.id,
			to: r.contractTable.userId,
		}),
	},

	contractTable: {
		autoSendConfiguration: r.one.contractAutoSendConfigurationTable({
			from: r.contractTable.id,
			to: r.contractAutoSendConfigurationTable.contractId,
			optional: false,
		}),
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
	},

	contractAutoSendConfigurationTable: {
		items: r.many.contractAutoSendConfigurationItemTable({
			from: r.contractAutoSendConfigurationTable.id,
			to: r.contractAutoSendConfigurationItemTable
				.contractAutoSendConfigurationId,
		}),
	},

	addressTable: {
		// Polymorphic inverse relations share the same id column.
		company: r.one.companyTable({
			from: r.addressTable.addressableId,
			to: r.companyTable.id,
			optional: true,
		}),
		contractClient: r.one.contractClientTable({
			from: r.addressTable.addressableId,
			to: r.contractClientTable.id,
			optional: true,
		}),
	},
}));
