import type { Table as ReactTable } from '@tanstack/react-table';
import type { DataTablePagination } from '../types';

export type DataTableFooterProps<TData> = {
	table: ReactTable<TData>;
	pagination?: DataTablePagination;
};
