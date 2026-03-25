import '@tanstack/react-start/server-only';

import { drizzle } from 'drizzle-orm/libsql';
import { envServer } from '@/lib/envServer';
import { relations } from './relations';
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

const schema = {
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

export const db = drizzle({
	connection: {
		url: envServer.TURSO_DATABASE_URL,
		authToken: envServer.TURSO_AUTH_TOKEN,
	},
	schema,
	relations,
});
