import { PlusIcon } from 'lucide-react';
import type { DataTableToolbarActionButton } from '../types';

type TableToolbarActionButtonProps<TData> = Partial<
	Omit<DataTableToolbarActionButton<TData>, 'onClick' | 'type' | 'label'>
> & {
	onClick: DataTableToolbarActionButton<TData>['onClick'];
	label: DataTableToolbarActionButton<TData>['label'];
};

export const getTableAddRowAction = <TData>(
	props: TableToolbarActionButtonProps<TData>,
): DataTableToolbarActionButton<TData> => {
	return {
		type: 'button',
		icon: PlusIcon,
		...props,
	};
};
