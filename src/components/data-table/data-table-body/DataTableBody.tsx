import { flexRender } from '@tanstack/react-table';
import { Table } from '@/components/table';
import type { DataTableBodyProps } from './types';
import type { DataTableColumnMeta } from '../types';

export const DataTableBody = <TData,>({
	table,
	colSpan,
	isLoading,
	emptyMessage,
}: DataTableBodyProps<TData>) => {
	'use no memo'; // React Compiler + TanStack Table compatibility workaround.

	const rows = table.getRowModel().rows;

	return (
		<Table.Body>
			{rows.length ? (
				rows.map((row) => (
					<Table.Row
						key={row.id}
						data-state={row.getIsSelected() && 'selected'}
					>
						{row.getVisibleCells().map((cell) => {
							const meta = cell.column.columnDef.meta as
								| DataTableColumnMeta
								| undefined;

							return (
								<Table.Cell
									key={cell.id}
									className={meta?.cellClassName}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</Table.Cell>
							);
						})}
					</Table.Row>
				))
			) : (
				<Table.Row>
					<Table.Cell
						colSpan={colSpan}
						className='h-24 text-center'
					>
						{isLoading ? null : emptyMessage}
					</Table.Cell>
				</Table.Row>
			)}
		</Table.Body>
	);
};
