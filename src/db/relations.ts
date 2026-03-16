import { defineRelations } from 'drizzle-orm';
import * as tables from './tables';

export const relations = defineRelations(tables, (r) => ({
	companyTable: {
		owner: r.one.userTable({
			from: r.companyTable.userId,
			to: r.userTable.id,
			optional: false,
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
}));
