import { Button } from '@/components/button';
import { fieldInputVariants } from '@/components/base-field';
import { Popover } from '@/components/popover';
import { FilterIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DataTableFilterProps } from './types';

export const DataTableFilter = <TData,>({
	column,
}: DataTableFilterProps<TData>) => {
	'use no memo'; // React Compiler + TanStack Table compatibility workaround.

	const columnFilterValue = column.getFilterValue();
	const isFiltered = column.getIsFiltered();

	if (!column.getCanFilter()) {
		return null;
	}

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<Button
					size='xxs'
					isIcon={true}
					variant={isFiltered ? 'primary' : 'secondary'}
					isGhost={true}
					className={cn('shrink-0')}
					aria-label='Open column filter'
					title='Open column filter'
				>
					<FilterIcon
						className={cn(
							'size-3.5',
							!isFiltered && 'text-foreground/50 hover:text-foreground',
						)}
					/>
				</Button>
			</Popover.Trigger>

			<Popover.Content className='w-56'>
				<Popover.Title>Filter</Popover.Title>
				<input
					type='text'
					data-slot='data-table-filter-input'
					value={typeof columnFilterValue === 'string' ? columnFilterValue : ''}
					onChange={(event) => {
						column.setFilterValue(event.target.value);
					}}
					placeholder='Type to filter...'
					className={cn(
						fieldInputVariants({
							focusMode: 'focusVisible',
						}),
						'text-xs',
					)}
				/>
				<div className='mt-1 flex justify-end border-t pt-2'>
					<Button
						type='button'
						size='xs'
						variant='secondary'
						onClick={() => {
							column.setFilterValue('');
						}}
					>
						Clear filter
					</Button>
				</div>
			</Popover.Content>
		</Popover.Root>
	);
};
