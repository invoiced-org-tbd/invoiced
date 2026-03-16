import { LayoutDashboardIcon } from 'lucide-react';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { AuthenticatedSidebarNavItem } from './types';

export const useAuthenticatedSidebarNavItems = (): AuthenticatedSidebarNavItem[] => {
	const { t } = useTranslate();

	return [
		{
			type: 'link',
			label: t('auth.dashboardTitle'),
			to: '/app',
			icon: LayoutDashboardIcon,
		},
		{
			type: 'group',
			label: t('auth.sidebar.management'),
			subItems: [],
		},
	];
};
