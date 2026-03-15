import type { OmitKeyof } from '@tanstack/react-query';
import type { LinkProps } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';

type SidebarNavBaseItem = {
	label: string;
	icon?: LucideIcon;
};

export type SidebarNavLinkItem = SidebarNavBaseItem & {
	type: 'link';
	to: LinkProps['to'];
	subItems?: never;
};

type SidebarNavBaseSubItem = OmitKeyof<SidebarNavLinkItem, 'subItems' | 'type'>;

export type SidebarNavGroupItem = SidebarNavBaseItem & {
	type: 'group';
	to?: never;
	subItems: SidebarNavBaseSubItem[];
};

export type AuthenticatedSidebarNavItem =
	| SidebarNavLinkItem
	| SidebarNavGroupItem;
