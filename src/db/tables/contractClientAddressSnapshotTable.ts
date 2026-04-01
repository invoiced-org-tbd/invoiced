import * as s from 'drizzle-orm/sqlite-core';
import {
	contractClientAddressTable,
	contractClientAddressTableColumns,
} from './contractClientAddressTable';
import { contractClientSnapshotIdColumn } from './contractClientSnapshotTable';

export const contractClientAddressSnapshotTable = s.sqliteTable(
	'contractClientAddressSnapshot',
	{
		...contractClientAddressTableColumns(),

		contractClientSnapshotId: contractClientSnapshotIdColumn(),
		originalContractClientAddressId: s
			.text()
			.references(() => contractClientAddressTable.id, {
				onDelete: 'set null',
			}),
	},
);
