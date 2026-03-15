import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import type { sidebarMenuButtonVariants } from './consts';

export type SidebarContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
	isMobile: boolean;
	setIsMobile: (isMobile: boolean) => void;
	toggleSidebar: () => void;
};

export type SidebarRootProps = ComponentProps<'div'>;

export type SidebarCollapsible = 'offcanvas' | 'icon';

export type SidebarPanelProps = ComponentProps<'div'> & {
	collapsible?: SidebarCollapsible;
};

export type SidebarContentProps = ComponentProps<'div'>;

export type SidebarGroupProps = ComponentProps<'div'>;

export type SidebarGroupLabelProps = ComponentProps<'div'> & {
	asChild?: boolean;
};

export type SidebarGroupContentProps = ComponentProps<'div'>;

export type SidebarMenuProps = ComponentProps<'ul'>;

export type SidebarMenuItemProps = ComponentProps<'li'>;

export type SidebarMenuButtonVariant = NonNullable<
	VariantProps<typeof sidebarMenuButtonVariants>['variant']
>;

export type SidebarMenuButtonSize = NonNullable<
	VariantProps<typeof sidebarMenuButtonVariants>['size']
>;

export type SidebarMenuButtonProps = ComponentProps<'button'> &
	VariantProps<typeof sidebarMenuButtonVariants> & {
		asChild?: boolean;
		isActive?: boolean;
	};

export type SidebarTriggerProps = ComponentProps<'button'> & {
	asChild?: boolean;
};
