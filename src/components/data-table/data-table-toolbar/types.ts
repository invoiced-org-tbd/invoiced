import type { Table as ReactTable } from '@tanstack/react-table';
import type { DataTableToolbarAction } from '../types';

export type DataTableToolbarProps<TData> = {
	table: ReactTable<TData>;
	actions: DataTableToolbarAction<TData>[];
};
