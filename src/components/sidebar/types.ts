import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import type { sidebarMenuButtonVariants } from './consts';

export type SidebarContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
	toggleSidebar: () => void;
};

export type SidebarRootProps = ComponentProps<'div'> & {
	inset?: boolean;
};

export type SidebarCollapsible = 'offcanvas' | 'icon' | false;

export type SidebarPanelProps = ComponentProps<'div'> & {
	collapsible?: SidebarCollapsible;
};

export type SidebarInsetProps = ComponentProps<'main'>;

export type SidebarContentProps = ComponentProps<'div'>;

export type SidebarGroupProps = ComponentProps<'div'>;

export type SidebarGroupLabelProps = ComponentProps<'div'> & {
	asChild?: boolean;
};

export type SidebarGroupContentProps = ComponentProps<'div'>;

export type SidebarMenuProps = ComponentProps<'ul'>;

export type SidebarMenuItemProps = ComponentProps<'li'>;

export type SidebarMenuButtonProps = ComponentProps<'button'> &
	VariantProps<typeof sidebarMenuButtonVariants> & {
		asChild?: boolean;
		isActive?: boolean;
		tooltip?: ReactNode;
	};

export type SidebarTriggerProps = ComponentProps<'button'> & {
	asChild?: boolean;
};
