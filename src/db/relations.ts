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
}));
