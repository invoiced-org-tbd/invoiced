import { Button } from '@/components/button';
import { DropdownMenu } from '@/components/dropdown-menu';
import { cn } from '@/lib/utils';
import type { DataTableFooterProps } from './types';
import { DEFAULT_DATA_TABLE_PAGE_SIZE_OPTIONS } from '../consts';

export const DataTableFooter = <TData,>({
	table,
	pagination,
}: DataTableFooterProps<TData>) => {
	'use no memo'; // React Compiler + TanStack Table compatibility workaround.

	const pageSizeOptions =
		pagination?.pageSizeOptions ?? DEFAULT_DATA_TABLE_PAGE_SIZE_OPTIONS;
	const totalItems = table.getRowCount();

	const pageCount = table.getPageCount();
	const currentPageSize = table.getState().pagination.pageSize;
	const visiblePageSizeOptions = pageSizeOptions.filter(
		(pageSizeOption) => pageSizeOption <= totalItems,
	);
	const selectablePageSizeOptions = visiblePageSizeOptions.includes(
		currentPageSize,
	)
		? visiblePageSizeOptions
		: [...visiblePageSizeOptions, currentPageSize].sort((a, b) => a - b);
	const shouldShowPageSizeSelector = selectablePageSizeOptions.length > 1;
	const shouldShowPagination = pageCount > 1;

	if (!shouldShowPageSizeSelector && !shouldShowPagination) {
		return null;
	}

	const currentPageIndex = table.getState().pagination.pageIndex;
	const previousPageIndex = currentPageIndex - 1;
	const nextPageIndex = currentPageIndex + 1;

	const pageIndexes = [
		previousPageIndex,
		currentPageIndex,
		nextPageIndex,
	].filter((pageIndex) => pageIndex >= 0 && pageIndex < pageCount);
	const shouldShowEllipsis = pageIndexes.length < pageCount;

	return (
		<div
			data-slot='data-table-footer'
			className={cn('flex items-center gap-2 p-2 justify-between')}
		>
			<div />

			<div className='flex items-center gap-5'>
				{shouldShowPageSizeSelector && (
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<Button
								type='button'
								size='xs'
								variant='secondary'
								className='h-7 px-2 w-min'
								aria-label='Select page size'
							>
								Rows: {currentPageSize}
							</Button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Content align='start'>
							<DropdownMenu.Label>Rows per page</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.RadioGroup
								value={`${currentPageSize}`}
								onValueChange={(value) => {
									table.setPageSize(Number(value));
								}}
							>
								{selectablePageSizeOptions.map((pageSizeOption) => (
									<DropdownMenu.RadioItem
										key={pageSizeOption}
										value={`${pageSizeOption}`}
									>
										{pageSizeOption}
									</DropdownMenu.RadioItem>
								))}
							</DropdownMenu.RadioGroup>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				)}

				{shouldShowPagination && (
					<div className='flex items-center justify-center gap-1'>
						{pageIndexes.map((pageIndex) => {
							const isCurrentPage = pageIndex === currentPageIndex;

							return (
								<Button
									key={pageIndex}
									type='button'
									size='xs'
									variant='secondary'
									isGhost={!isCurrentPage}
									isIcon={true}
									disabled={isCurrentPage}
									onClick={() => table.setPageIndex(pageIndex)}
									className={cn(isCurrentPage && 'cursor-default')}
									aria-label={`Go to page ${pageIndex + 1}`}
									aria-current={isCurrentPage ? 'page' : undefined}
								>
									{pageIndex + 1}
								</Button>
							);
						})}

						{shouldShowEllipsis && (
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild>
									<Button
										type='button'
										size='xs'
										variant='secondary'
										isIcon={true}
										className='h-7 min-w-7 px-2'
										aria-label='Select page'
									>
										...
									</Button>
								</DropdownMenu.Trigger>

								<DropdownMenu.Content
									align='center'
									className='max-h-56 overflow-y-auto'
								>
									<DropdownMenu.Label>Select page</DropdownMenu.Label>
									<DropdownMenu.Separator />
									<DropdownMenu.RadioGroup
										value={`${currentPageIndex}`}
										onValueChange={(value) => {
											table.setPageIndex(Number(value));
										}}
									>
										{Array.from({ length: pageCount }).map((_, pageIndex) => (
											<DropdownMenu.RadioItem
												key={pageIndex}
												value={`${pageIndex}`}
											>
												Page {pageIndex + 1}
											</DropdownMenu.RadioItem>
										))}
									</DropdownMenu.RadioGroup>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
