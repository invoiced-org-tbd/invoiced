import { Button } from '@/components/button';
import { fieldInputVariants } from '@/components/base-field';
import { Popover } from '@/components/popover';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { FilterIcon } from 'lucide-react';
import { cn } from '@/utils/classNamesUtils';
import type { DataTableFilterProps } from './types';

export const DataTableFilter = <TData,>({
	column,
}: DataTableFilterProps<TData>) => {
	'use no memo'; // React Compiler + TanStack Table compatibility workaround.
	const { t } = useTranslate();

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
					aria-label={t('a11y.openColumnFilter')}
					title={t('a11y.openColumnFilter')}
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
				<Popover.Title>{t('dataTable.filter.title')}</Popover.Title>
				<input
					type='text'
					data-slot='data-table-filter-input'
					value={typeof columnFilterValue === 'string' ? columnFilterValue : ''}
					onChange={(event) => {
						column.setFilterValue(event.target.value);
					}}
					placeholder={t('dataTable.filter.inputPlaceholder')}
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
						{t('dataTable.filter.clearButton')}
					</Button>
				</div>
			</Popover.Content>
		</Popover.Root>
	);
};
