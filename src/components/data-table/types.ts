import type { OnChangeFn } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { ButtonProps } from '@/components/button';
import type { DropdownMenuItemProps } from '@/components/dropdown-menu';
import type {
	DataTableAccessorKeyColumn,
	DataTableIdColumn,
} from './data-table-cell-render/types';
import type {
	DataTableOrderByState,
	DataTablePaginationState,
} from './schemas';

type DataTablePaginationBaseOptions = {
	pageSizeOptions?: number[];
};

export type DataTableSort<TData> = {
	id: Extract<keyof TData, string>;
	desc: boolean;
};

export type DataTableClientSort = boolean;

export type DataTableServerSort = {
	state: DataTableOrderByState;
	setState: OnChangeFn<DataTableOrderByState>;
};

export type DataTableFilterItem<TData> = {
	id: Extract<keyof TData, string>;
	value: string;
};

export type DataTableServerFilter<TData> = {
	state: DataTableFilterItem<TData>[];
	setState: OnChangeFn<DataTableFilterItem<TData>[]>;
};

export type DataTableClientPagination = DataTablePaginationBaseOptions & {
	isServerSide?: false;
};

export type DataTableServerPagination = DataTablePaginationBaseOptions & {
	isServerSide: true;
	state: DataTablePaginationState;
	setState: OnChangeFn<DataTablePaginationState>;
	totalItems: number;
};

export type DataTablePagination =
	| DataTableClientPagination
	| DataTableServerPagination;

export type DataTableColumnMeta = {
	headerClassName?: string;
	cellClassName?: string;
};

type SharedButtonProps = Pick<
	ButtonProps,
	'variant' | 'isOutlined' | 'disabled' | 'isGhost'
>;

export type DataTableRowActionButton<TData> = {
	type: 'button';
	icon: LucideIcon;
	tooltip: string;
	onClick: (rowData: TData) => void;
	className?: string;
} & SharedButtonProps;

export type DataTableRowActionDropdownItem<TData> = {
	id?: string;
	icon?: LucideIcon;
	label: ReactNode;
	onClick: (rowData: TData) => void;
	disabled?: boolean;
} & Pick<DropdownMenuItemProps, 'className' | 'variant'>;

export type DataTableRowActionDropdown<TData> = {
	type: 'dropdown';
	icon?: LucideIcon;
	tooltip?: string;
	items: DataTableRowActionDropdownItem<TData>[];
	className?: string;
} & SharedButtonProps;

export type DataTableRowActionOther = {
	type: 'other';
	label: ReactNode;
	className?: string;
};

export type DataTableRowAction<TData> =
	| DataTableRowActionButton<TData>
	| DataTableRowActionDropdown<TData>
	| DataTableRowActionOther;

export type DataTableToolbarActionOnClickParams<TData> = {
	data: TData[];
};

export type DataTableToolbarActionButton<TData> = {
	type: 'button';
	label: ReactNode;
	icon?: LucideIcon;
	onClick: (params: DataTableToolbarActionOnClickParams<TData>) => void;
	className?: string;
} & SharedButtonProps;

export type DataTableToolbarActionDropdownItem<TData> = {
	id?: string;
	label: ReactNode;
	icon?: LucideIcon;
	onClick: (params: DataTableToolbarActionOnClickParams<TData>) => void;
	disabled?: boolean;
} & Pick<DropdownMenuItemProps, 'className' | 'variant'>;

export type DataTableToolbarActionDropdown<TData> = {
	type: 'dropdown';
	label: ReactNode;
	icon?: LucideIcon;
	items: DataTableToolbarActionDropdownItem<TData>[];
	className?: string;
} & SharedButtonProps;

export type DataTableToolbarActionOther = {
	type: 'other';
	label: ReactNode;
	className?: string;
};

export type DataTableToolbarAction<TData> =
	| DataTableToolbarActionButton<TData>
	| DataTableToolbarActionDropdown<TData>
	| DataTableToolbarActionOther;

export type DataTableColumn<TData> =
	| DataTableIdColumn<TData>
	| DataTableAccessorKeyColumn<TData>;

type DataTableSharedProps<TData> = {
	columns: DataTableColumn<TData>[];
	data?: TData[];
	isLoading?: boolean;
	emptyMessage?: string;
	className?: string;
	rowActions?: DataTableRowAction<TData>[];
	toolbarActions?: DataTableToolbarAction<TData>[];
};

export type DataTableClientProps<TData> = DataTableSharedProps<TData> & {
	pagination?: DataTableClientPagination;
	sort?: DataTableClientSort;
	filter?: never;
	defaultSort?: DataTableSort<TData>;
};

export type DataTableServerProps<TData> = DataTableSharedProps<TData> & {
	pagination: DataTableServerPagination;
	sort?: DataTableServerSort;
	filter?: DataTableServerFilter<TData>;
	defaultSort?: never;
};

export type DataTableProps<TData> =
	| DataTableClientProps<TData>
	| DataTableServerProps<TData>;
