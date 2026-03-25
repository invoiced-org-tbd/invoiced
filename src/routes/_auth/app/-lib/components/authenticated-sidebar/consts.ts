import {
	FileStackIcon,
	FileTextIcon,
	HandCoinsIcon,
	LayoutDashboardIcon,
} from 'lucide-react';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { AuthenticatedSidebarNavItem } from './types';

export const useAuthenticatedSidebarNavItems =
	(): AuthenticatedSidebarNavItem[] => {
		const { t } = useTranslate();

		return [
			{
				type: 'link',
				label: t('auth.dashboardTitle'),
				to: '/app/dashboard',
				icon: LayoutDashboardIcon,
			},
			{
				type: 'group',
				label: 'ERP',
				subItems: [
					{
						label: t('auth.sidebar.cashflow'),
						to: '/app/cashflow',
						icon: HandCoinsIcon,
					},
				],
			},
			{
				type: 'group',
				label: t('auth.sidebar.management'),
				subItems: [
					{
						label: t('auth.sidebar.contracts'),
						to: '/app/contracts',
						icon: FileStackIcon,
					},
					{
						label: t('auth.sidebar.invoices'),
						to: '/app/invoices',
						icon: FileTextIcon,
					},
				],
			},
		];
	};
