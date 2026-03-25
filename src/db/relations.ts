import { defineRelations } from 'drizzle-orm';
import { accountTable } from './tables/accountTable';
import { companyAddressTable } from './tables/companyAddressTable';
import { companyTable } from './tables/companyTable';
import { contractClientAddressTable } from './tables/contractClientAddressTable';
import { contractClientTable } from './tables/contractClientTable';
import { contractRoleTable } from './tables/contractRoleTable';
import { contractTable } from './tables/contractTable';
import { sessionTable } from './tables/sessionTable';
import { userTable } from './tables/userTable';
import { verificationTable } from './tables/verificationTable';

const tables = {
	accountTable,
	companyAddressTable,
	companyTable,
	contractClientAddressTable,
	contractClientTable,
	contractRoleTable,
	contractTable,
	sessionTable,
	userTable,
	verificationTable,
};

export const relations = defineRelations(tables, (r) => ({
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
	},

	contractClientTable: {
		address: r.one.contractClientAddressTable({
			from: r.contractClientTable.id,
			to: r.contractClientAddressTable.contractClientId,
			optional: false,
		}),
	},
}));
