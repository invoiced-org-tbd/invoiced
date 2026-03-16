import { defineRelations } from 'drizzle-orm';
import * as tables from './tables';

export const relations = defineRelations(tables, (r) => ({
	companyTable: {
		owner: r.one.userTable({
			alias: 'owner',
			from: r.companyTable.userId,
			to: r.userTable.id,
		}),
	},

	contractTable: {
		company: r.one.companyTable({
			from: r.contractTable.companyId,
			to: r.companyTable.id,
		}),
	},

	contractRoleTable: {
		contract: r.one.contractTable({
			from: r.contractRoleTable.contractId,
			to: r.contractTable.id,
		}),
	},
}));
