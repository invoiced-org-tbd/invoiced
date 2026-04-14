import { cva } from 'class-variance-authority';

export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_ICON = '4rem';

export const sidebarMenuButtonVariants = cva(
	'peer/menu-button ring-sidebar-ring data-active:hover:bg-primary/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-active:bg-primary data-active:text-sidebar-accent-foreground data-active:font-medium flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'hover:text-sidebar-accent-foreground',
				outline:
					'bg-background hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
			},
			size: {
				default: 'h-8 text-sm',
				sm: 'h-7 text-xs',
				lg: 'min-h-12 min-w-12 text-sm px-4 group-data-[collapsible=icon]:px-4!',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);
