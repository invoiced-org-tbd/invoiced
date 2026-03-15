import { PencilIcon, TrashIcon } from 'lucide-react';
import type { DataTableRowActionButton } from '../types';

type TableRowActionButtonProps<TData> = Partial<
	Omit<DataTableRowActionButton<TData>, 'onClick' | 'type'>
> & {
	onClick: DataTableRowActionButton<TData>['onClick'];
};

export const getTableEditRowAction = <TData,>(
	props: TableRowActionButtonProps<TData>,
): DataTableRowActionButton<TData> => {
	return {
		type: 'button',
		icon: PencilIcon,
		tooltip: 'Edit',
		...props,
	};
};

export const getTableDeleteRowAction = <TData,>(
	props: TableRowActionButtonProps<TData>,
): DataTableRowActionButton<TData> => {
	return {
		type: 'button',
		icon: TrashIcon,
		tooltip: 'Delete',
		variant: 'destructive',
		...props,
	};
};
