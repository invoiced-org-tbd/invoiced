import { defineRelations } from 'drizzle-orm';
import * as tables from './tables';

export const relations = defineRelations(tables, (r) => ({
	companyTable: {
		owner: r.one.userTable({
			from: r.companyTable.userId,
			to: r.userTable.id,
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
		}),
		client: r.one.contractClientTable({
			from: r.contractTable.id,
			to: r.contractClientTable.contractId,
		}),
		role: r.one.contractRoleTable({
			from: r.contractTable.id,
			to: r.contractRoleTable.contractId,
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
