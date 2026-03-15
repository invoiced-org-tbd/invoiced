import { Button } from '@/components/button';
import { DropdownMenu } from '@/components/dropdown-menu';
import type { DataTableToolbarProps } from './types';

export const DataTableToolbar = <TData,>({
	table,
	actions,
}: DataTableToolbarProps<TData>) => {
	'use no memo'; // React Compiler + TanStack Table compatibility workaround.

	const actionContext = {
		data: table.getRowModel().rows.map((row) => row.original),
	};

	return (
		<div
			data-slot='data-table-toolbar'
			className='flex items-center justify-end gap-2 pb-2 pt-1'
		>
			{actions.map((action, index) => {
				if (action.type === 'button') {
					const ActionIcon = action.icon;

					return (
						<Button
							key={`button-${index}`}
							variant={action.variant ?? 'primary'}
							isOutlined={action.isOutlined}
							disabled={action.disabled}
							className={action.className}
							size='sm'
							onClick={() => action.onClick(actionContext)}
						>
							{ActionIcon ? <ActionIcon /> : null}
							{action.label}
						</Button>
					);
				}

				if (action.type === 'dropdown') {
					const TriggerIcon = action.icon;

					return (
						<DropdownMenu.Root key={`dropdown-${index}`}>
							<DropdownMenu.Trigger asChild={true}>
								<Button
									variant={action.variant}
									isOutlined={action.isOutlined}
									isIcon={true}
									disabled={action.disabled}
									className={action.className}
								>
									{TriggerIcon ? <TriggerIcon /> : null}
									{action.label}
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
											onClick={() => item.onClick(actionContext)}
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
	);
};
