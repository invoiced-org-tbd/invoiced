import {
	FileStackIcon,
	FileTextIcon,
	HandCoinsIcon,
	LayoutDashboardIcon,
	ReceiptIcon,
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
				to: '/app',
				icon: LayoutDashboardIcon,
			},
			{
				type: 'group',
				label: 'ERP',
				subItems: [
					{
						label: t('auth.sidebar.cashflow'),
						to: '/app',
						icon: HandCoinsIcon,
					},
					{
						label: t('auth.sidebar.receivableDebtAccounts'),
						to: '/app',
						icon: ReceiptIcon,
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
