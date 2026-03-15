import type { ColumnDef } from '@tanstack/react-table';
import { EllipsisIcon } from 'lucide-react';
import { Button } from '@/components/button';
import { DropdownMenu } from '@/components/dropdown-menu';
import { DATA_TABLE_ROW_ACTIONS_COLUMN_ID } from './consts';
import type { DataTableColumnMeta, DataTableRowAction } from './types';

export const createRowActionsColumn = <TData,>(
	rowActions: DataTableRowAction<TData>[],
): ColumnDef<TData, unknown> => ({
	id: DATA_TABLE_ROW_ACTIONS_COLUMN_ID,
	header: '',
	enableSorting: false,
	enableHiding: false,
	meta: {
		headerClassName:
			'sticky right-0 z-20 w-px whitespace-nowrap px-2 bg-transparent',
		cellClassName:
			'sticky right-0 z-10 w-px whitespace-nowrap px-2 bg-transparent',
	} satisfies DataTableColumnMeta,
	cell: ({ row }) => (
		<div
			data-slot='data-table-row-actions'
			className='flex items-center justify-end gap-1'
		>
			{rowActions.map((action, index) => {
				if (action.type === 'button') {
					const ActionIcon = action.icon;

					return (
						<Button
							key={`button-${index}`}
							size='xxs'
							variant={action.variant ?? 'secondary'}
							isGhost={action.isGhost ?? true}
							isOutlined={action.isOutlined}
							isIcon={true}
							disabled={action.disabled}
							className={action.className}
							tooltip={action.tooltip}
							aria-label={action.tooltip}
							onClick={() => action.onClick(row.original)}
						>
							<ActionIcon />
						</Button>
					);
				}

				if (action.type === 'dropdown') {
					const TriggerIcon = action.icon ?? EllipsisIcon;
					const triggerTooltip = action.tooltip ?? 'Row actions';

					return (
						<DropdownMenu.Root key={`dropdown-${index}`}>
							<DropdownMenu.Trigger asChild={true}>
								<Button
									size='xxs'
									variant={action.variant}
									isOutlined={action.isOutlined}
									isIcon={true}
									disabled={action.disabled}
									className={action.className}
									title={triggerTooltip}
									aria-label={triggerTooltip}
								>
									<TriggerIcon />
								</Button>
							</DropdownMenu.Trigger>

							<DropdownMenu.Content align='end'>
								{action.items.map((item, itemIndex) => {
									const ItemIcon = item.icon;

									return (
										<DropdownMenu.Item
											key={item.id ?? `item-${itemIndex}`}
											disabled={item.disabled}
											className={item.className}
											variant={item.variant}
											onClick={() => item.onClick(row.original)}
										>
											{ItemIcon ? <ItemIcon /> : null}
											{item.label}
										</DropdownMenu.Item>
									);
								})}
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					);
				}

				return (
					<div
						key={`other-${index}`}
						className={action.className}
					>
						{action.label}
					</div>
				);
			})}
		</div>
	),
});
