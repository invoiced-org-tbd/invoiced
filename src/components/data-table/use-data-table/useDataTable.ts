import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import type {
	ColumnFiltersState,
	OnChangeFn,
	SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
	DATA_TABLE_DEFAULT_PAGINATION_STATE,
	DATA_TABLE_INITIAL_PAGE_INDEX,
} from './consts';
import type { UseDataTableParams } from './types';
import {
	hasDataTableColumnFiltersChanged,
	resolveDataTableColumn,
	resolveDataTableColumnFilters,
	resolveDataTableSingleColumnSorting,
	toServerDataTableFilters,
} from './utils';
import type { DataTableOrderByState } from '../schemas';

export const useDataTable = <TData>({
	columns: baseColumns,
	data,
	isLoading = false,
	defaultSort,
	pagination,
	sort,
	filter,
	rowActions,
	toolbarActions,
}: UseDataTableParams<TData>) => {
	'use no memo'; // React Compiler + TanStack Table compatibility workaround.

	const [tablePagination, setTablePagination] = useState(
		DATA_TABLE_DEFAULT_PAGINATION_STATE,
	);
	const [tableSorting, setTableSorting] = useState<DataTableOrderByState[]>(
		() => (defaultSort ? [defaultSort] : []),
	);
	const [tableColumnFilters, setTableColumnFilters] =
		useState<ColumnFiltersState>([]);

	const serverPagination =
		pagination?.isServerSide === true ? pagination : null;
	const isServerPaginationEnabled = serverPagination !== null;
	const serverSort =
		isServerPaginationEnabled && typeof sort === 'object' && sort !== null
			? sort
			: null;
	const isClientSortEnabled = !isServerPaginationEnabled && sort !== false;
	const isServerSortEnabled = isServerPaginationEnabled && serverSort !== null;
	const isSortingEnabled = isClientSortEnabled || isServerSortEnabled;
	const serverFilter =
		isServerPaginationEnabled && typeof filter === 'object' && filter !== null
			? filter
			: null;
	const isClientFilterEnabled = !isServerPaginationEnabled;
	const isServerFilterEnabled =
		isServerPaginationEnabled && serverFilter !== null;
	const isFilteringEnabled = isClientFilterEnabled || isServerFilterEnabled;

	const resolvedPagination = isServerPaginationEnabled
		? serverPagination.state
		: tablePagination;
	const resolvedOnPaginationChange = isServerPaginationEnabled
		? serverPagination.setState
		: setTablePagination;
	const resolvedSorting = isServerSortEnabled
		? [serverSort.state]
		: isClientSortEnabled
			? tableSorting
			: [];
	const resolvedColumnFilters = isServerFilterEnabled
		? serverFilter.state.map((filterItem) => ({
				id: filterItem.id,
				value: filterItem.value,
			}))
		: tableColumnFilters;

	const resolvedOnSortingChange: OnChangeFn<SortingState> = (updater) => {
		if (!isSortingEnabled) {
			return;
		}

		const nextSorting = resolveDataTableSingleColumnSorting<TData>(
			updater,
			resolvedSorting,
		);
		const previousSort = resolvedSorting[0];
		const nextSort = nextSorting[0];
		const hasSortChanged =
			previousSort?.id !== nextSort?.id ||
			previousSort?.desc !== nextSort?.desc;

		if (hasSortChanged) {
			resolvedOnPaginationChange((previousPagination) => ({
				...previousPagination,
				pageIndex: DATA_TABLE_INITIAL_PAGE_INDEX,
			}));
		}

		if (isServerSortEnabled) {
			if (!nextSort) {
				return;
			}

			serverSort.setState({
				id: nextSort.id as Extract<keyof TData, string>,
				desc: nextSort.desc,
			});
			return;
		}

		setTableSorting(nextSorting);
	};

	const resolvedOnColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (
		updater,
	) => {
		if (!isFilteringEnabled) {
			return;
		}

		const nextColumnFilters = resolveDataTableColumnFilters(
			updater,
			resolvedColumnFilters,
		);
		const didFiltersChange = hasDataTableColumnFiltersChanged(
			resolvedColumnFilters,
			nextColumnFilters,
		);

		if (didFiltersChange) {
			resolvedOnPaginationChange((previousPagination) => ({
				...previousPagination,
				pageIndex: DATA_TABLE_INITIAL_PAGE_INDEX,
			}));
		}

		if (isServerFilterEnabled) {
			serverFilter.setState(toServerDataTableFilters<TData>(nextColumnFilters));
			return;
		}

		setTableColumnFilters(nextColumnFilters);
	};

	const columns = resolveDataTableColumn({
		baseColumns,
		rowActions: rowActions ?? [],
	});

	const table = useReactTable({
		data: data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: isServerPaginationEnabled
			? undefined
			: getPaginationRowModel(),
		getSortedRowModel: isClientSortEnabled ? getSortedRowModel() : undefined,
		getFilteredRowModel: isClientFilterEnabled
			? getFilteredRowModel()
			: undefined,
		manualPagination: isServerPaginationEnabled,
		manualSorting: isServerSortEnabled,
		manualFiltering: isServerFilterEnabled,
		enableSorting: isSortingEnabled,
		enableColumnFilters: isFilteringEnabled,
		enableMultiSort: false,
		enableSortingRemoval: !isServerPaginationEnabled,
		rowCount: isServerPaginationEnabled
			? serverPagination.totalItems
			: undefined,
		onPaginationChange: resolvedOnPaginationChange,
		onSortingChange: isSortingEnabled ? resolvedOnSortingChange : undefined,
		onColumnFiltersChange: isFilteringEnabled
			? resolvedOnColumnFiltersChange
			: undefined,
		state: {
			pagination: resolvedPagination,
			sorting: resolvedSorting,
			columnFilters: resolvedColumnFilters,
		},
	});

	const showLoading =
		isLoading || (isServerPaginationEnabled && (data?.length ?? 0) === 0);
	const hasToolbarActions = (toolbarActions?.length ?? 0) > 0;

	return {
		table,
		columns,
		hasToolbarActions,
		showLoading,
	};
};
