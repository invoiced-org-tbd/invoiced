import * as s from 'drizzle-orm/sqlite-core';
import {
	contractClientTable,
	contractClientTableColumns,
} from './contractClientTable';
import { contractSnapshotIdColumn } from './contractSnapshotTable';

export const contractClientSnapshotTable = s.sqliteTable(
	'contractClientSnapshot',
	{
		...contractClientTableColumns(),

		contractSnapshotId: contractSnapshotIdColumn(),
		originalContractClientId: s
			.text()
			.references(() => contractClientTable.id, { onDelete: 'set null' }),
	},
);

export const contractClientSnapshotIdColumn = () =>
	s
		.text()
		.notNull()
		.references(() => contractClientSnapshotTable.id, { onDelete: 'cascade' });
