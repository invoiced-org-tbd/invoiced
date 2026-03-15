import type { Column } from '@tanstack/react-table';

export type DataTableFilterProps<TData> = {
	column: Column<TData, unknown>;
};
