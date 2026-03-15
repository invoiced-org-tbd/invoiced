import type { Table as ReactTable } from '@tanstack/react-table';

export type DataTableBodyProps<TData> = {
	table: ReactTable<TData>;
	colSpan: number;
	isLoading?: boolean;
	emptyMessage: string;
};
