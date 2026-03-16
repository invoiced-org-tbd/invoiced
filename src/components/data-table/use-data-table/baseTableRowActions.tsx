import { PencilIcon, TrashIcon } from 'lucide-react';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { DataTableRowActionButton } from '../types';

type TableRowActionButtonProps<TData> = Partial<
	Omit<DataTableRowActionButton<TData>, 'onClick' | 'type'>
> & {
	onClick: DataTableRowActionButton<TData>['onClick'];
};

export const useGetTableEditRowAction = <TData,>() => {
	const { t } = useTranslate();

	const getTableEditRowAction = (
		props: TableRowActionButtonProps<TData>,
	): DataTableRowActionButton<TData> => {
		return {
			type: 'button',
			icon: PencilIcon,
			tooltip: t('common.edit'),
			...props,
		};
	};

	return {
		getTableEditRowAction,
	};
};

export const useGetTableDeleteRowAction = <TData,>() => {
	const { t } = useTranslate();

	const getTableDeleteRowAction = (
		props: TableRowActionButtonProps<TData>,
	): DataTableRowActionButton<TData> => {
		return {
			type: 'button',
			icon: TrashIcon,
			tooltip: t('common.delete'),
			variant: 'destructive',
			...props,
		};
	};

	return {
		getTableDeleteRowAction,
	};
};
