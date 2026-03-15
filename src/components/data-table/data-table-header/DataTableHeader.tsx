import { Button } from '@/components/button';
import { Table } from '@/components/table';
import { flexRender } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DataTableHeaderProps } from './types';
import { DataTableFilter } from '../data-table-filter/DataTableFilter';
import type { DataTableColumnMeta } from '../types';

export const DataTableHeader = <TData,>({
	table,
}: DataTableHeaderProps<TData>) => {
	'use no memo'; // React Compiler + TanStack Table compatibility workaround.

	return (
		<Table.Header>
			{table.getHeaderGroups().map((headerGroup) => (
				<Table.Row key={headerGroup.id}>
					{headerGroup.headers.map((header) => {
						const meta = header.column.columnDef.meta as
							| DataTableColumnMeta
							| undefined;

						const sortState = header.column.getIsSorted();
						const isSorted = sortState !== false;

						return (
							<Table.Head
								key={header.id}
								className={cn(meta?.headerClassName, isSorted && 'bg-muted/70')}
							>
								{header.isPlaceholder ? null : (
									<div className='flex items-center gap-1.5'>
										<div className='min-w-0 truncate'>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</div>

										<div className='flex shrink-0 items-center gap-1'>
											{header.column.getCanSort() ? (
												<Button
													size='xxs'
													isIcon={true}
													variant='secondary'
													isGhost={!isSorted}
													aria-label='Toggle column sorting'
													onClick={header.column.getToggleSortingHandler()}
												>
													{sortState === 'asc' ? (
														<ArrowUpIcon className='size-3.5' />
													) : sortState === 'desc' ? (
														<ArrowDownIcon className='size-3.5' />
													) : (
														<ArrowUpDownIcon className='size-3.5' />
													)}
												</Button>
											) : null}

											<DataTableFilter column={header.column} />
										</div>
									</div>
								)}
							</Table.Head>
						);
					})}
				</Table.Row>
			))}
		</Table.Header>
	);
};
