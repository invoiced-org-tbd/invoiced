import { LayoutDashboardIcon } from 'lucide-react';
import type { AuthenticatedSidebarNavItem } from './types';

export const authenticatedSidebarNavItems: AuthenticatedSidebarNavItem[] = [
	{
		type: 'link',
		label: 'Dashboard',
		to: '/app',
		icon: LayoutDashboardIcon,
	},
	{
		type: 'group',
		label: 'Management',
		subItems: [],
	},
];
