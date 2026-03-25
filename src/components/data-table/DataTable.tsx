import { LoaderCircleIcon } from 'lucide-react';
import { cn } from '@/utils/classNamesUtils';
import { Table } from '@/components/table/Table';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { DataTableBody } from './data-table-body/DataTableBody';
import { DataTableFooter } from './data-table-footer/DataTableFooter';
import { DataTableHeader } from './data-table-header/DataTableHeader';
import { DataTableToolbar } from './data-table-toolbar/DataTableToolbar';
import type { DataTableProps } from './types';
import { useDataTable } from './use-data-table/useDataTable';

export const DataTable = <TData,>(props: DataTableProps<TData>) => {
	'use no memo';
	const { t } = useTranslate();

	const {
		emptyMessage = t('dataTable.emptyMessage'),
		className,
		toolbarActions,
		pagination,
	} = props;
	const { table, columns, hasToolbarActions, showLoading } =
		useDataTable(props);

	return (
		<div
			data-slot='data-table'
			className={cn('relative overflow-hidden', className)}
		>
			{hasToolbarActions && (
				<DataTableToolbar
					table={table}
					actions={toolbarActions ?? []}
				/>
			)}

			<Table.Root
				className={cn(
					showLoading &&
						'[&_tbody]:opacity-50 [&_tbody]:transition-opacity [&_tbody]:duration-200',
				)}
			>
				<DataTableHeader table={table} />

				<DataTableBody
					table={table}
					colSpan={columns.length}
					isLoading={showLoading}
					emptyMessage={emptyMessage}
				/>
			</Table.Root>

			{showLoading && (
				<div className='pointer-events-none absolute inset-x-0 top-10 bottom-0 flex items-center justify-center'>
					<LoaderCircleIcon className='text-muted-foreground size-5 animate-spin' />
				</div>
			)}

			<DataTableFooter
				table={table}
				pagination={pagination}
			/>
		</div>
	);
};
