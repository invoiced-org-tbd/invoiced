import * as s from 'drizzle-orm/sqlite-core';
import {
	contractRoleTable,
	contractRoleTableColumns,
} from './contractRoleTable';
import { contractSnapshotIdColumn } from './contractSnapshotTable';

export const contractRoleSnapshotTable = s.sqliteTable('contractRoleSnapshot', {
	...contractRoleTableColumns(),

	contractSnapshotId: contractSnapshotIdColumn(),
	originalContractRoleId: s
		.text()
		.references(() => contractRoleTable.id, { onDelete: 'set null' }),
});
