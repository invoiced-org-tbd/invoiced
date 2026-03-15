import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	Updater,
} from '@tanstack/react-table';
import type {
	DataTableColumn,
	DataTableFilterItem,
	DataTableRowAction,
} from '../types';
import type {
	DataTableAccessorKeyColumn,
	DataTableFormatStyle,
} from '../data-table-cell-render/types';
import { createRowActionsColumn } from '../utils';
import { DataTableCellRender } from '../data-table-cell-render';
import type { ReactNode } from 'react';
import { toTitleCase } from '@/utils/stringUtils';

export const resolveDataTableSingleColumnSorting = <TData,>(
	updater: Updater<SortingState>,
	previousSorting: SortingState,
) => {
	const nextSorting =
		typeof updater === 'function' ? updater(previousSorting) : updater;

	if (nextSorting.length === 0) {
		return [];
	}

	return [
		{
			id: nextSorting[0].id as Extract<keyof TData, string>,
			desc: nextSorting[0].desc,
		},
	];
};

export const resolveDataTableColumnFilters = (
	updater: Updater<ColumnFiltersState>,
	previousColumnFilters: ColumnFiltersState,
) => (typeof updater === 'function' ? updater(previousColumnFilters) : updater);

export const hasDataTableColumnFiltersChanged = (
	previousColumnFilters: ColumnFiltersState,
	nextColumnFilters: ColumnFiltersState,
) => {
	if (previousColumnFilters.length !== nextColumnFilters.length) {
		return true;
	}

	return previousColumnFilters.some((previousFilter, index) => {
		const nextFilter = nextColumnFilters[index];
		return (
			previousFilter?.id !== nextFilter?.id ||
			previousFilter?.value !== nextFilter?.value
		);
	});
};

export const toServerDataTableFilters = <TData,>(
	columnFilters: ColumnFiltersState,
): DataTableFilterItem<TData>[] =>
	columnFilters.flatMap((columnFilter) => {
		if (typeof columnFilter.value !== 'string') {
			return [];
		}

		const value = columnFilter.value.trim();
		if (!value) {
			return [];
		}

		return [
			{
				id: columnFilter.id as Extract<keyof TData, string>,
				value,
			},
		];
	});

const isAccessorKeyColumn = <TData,>(
	column: DataTableColumn<TData>,
): column is DataTableAccessorKeyColumn<TData> => {
	return 'accessorKey' in column && column.accessorKey !== undefined;
};

const isMinWidthColumn = (style: DataTableFormatStyle) => {
	if (!style) {
		return false;
	}

	return ['id', 'email', 'phone'].includes(style);
};

const getColumnMeta = (style: DataTableFormatStyle) => {
	if (!style) {
		return undefined;
	}
	const isMinWidth = isMinWidthColumn(style);
	if (!isMinWidth) {
		return undefined;
	}

	return {
		headerClassName: 'w-px pr-5',
	};
};

type ResolveDataTableColumnParams<TData> = {
	baseColumns: DataTableColumn<TData>[];
	rowActions: DataTableRowAction<TData>[];
};
export const resolveDataTableColumn = <TData,>({
	baseColumns,
	rowActions,
}: ResolveDataTableColumnParams<TData>) => {
	const columns: ColumnDef<TData>[] = [];

	for (const column of baseColumns) {
		let headerContent: ReactNode = column.header;

		if (!headerContent) {
			if (column.accessorKey) {
				headerContent = toTitleCase(String(column.accessorKey));
			} else if (column.id) {
				headerContent = toTitleCase(String(column.id));
			}
		}
		const header = headerContent
			? () => <span>{headerContent}</span>
			: undefined;

		if (column.id) {
			columns.push({
				id: column.id,
				header,
				cell: ({ row }) => column.cell(row.original),
			});
			continue;
		}

		if (!isAccessorKeyColumn(column)) {
			continue;
		}

		columns.push({
			id: column.accessorKey,
			header,
			accessorKey: column.accessorKey,
			enableSorting: column.canSort,
			enableHiding: column.canHide,
			meta: getColumnMeta(column.format?.style),
			cell: ({ row }) => (
				<DataTableCellRender
					data={row.original}
					column={column}
				/>
			),
		});
	}

	if (rowActions.length > 0) {
		columns.push(createRowActionsColumn(rowActions));
	}

	return columns;
};
