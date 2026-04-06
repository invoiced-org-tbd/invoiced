import type { LucideIcon } from 'lucide-react';
import {
	BellIcon,
	BotIcon,
	Building2Icon,
	CreditCardIcon,
	UserIcon,
} from 'lucide-react';
import type { FC } from 'react';
import type { SettingsTab } from '../..';
import { SettingsAccountTab } from '../settings-account-tab/SettingsAccountTab';
import { SettingsAutomationsTab } from '../settings-automations-tab/SettingsAutomationsTab';
import { SettingsBillingPlansTab } from '../settings-billing-plans-tab/SettingsBillingPlansTab';
import { SettingsCompanyTab } from '../settings-company-tab/SettingsCompanyTab';
import { SettingsNotificationsTab } from '../settings-notifications-tab/SettingsNotificationsTab';
import { useTranslate } from '@/hooks/use-translate/useTranslate';

type SettingsTabItem = {
	value: SettingsTab;
	label: string;
	icon: LucideIcon;
	Content: FC;
};

export const useSettingsTabs = () => {
	const { t } = useTranslate();

	const settingsTabs = [
		{
			value: 'account',
			label: t('settings.tabs.account.title'),
			icon: UserIcon,
			Content: SettingsAccountTab,
		},
		{
			value: 'company',
			label: t('settings.tabs.company.title'),
			icon: Building2Icon,
			Content: SettingsCompanyTab,
		},
		{
			value: 'automations',
			label: t('settings.tabs.automations.title'),
			icon: BotIcon,
			Content: SettingsAutomationsTab,
		},
		{
			value: 'notifications',
			label: t('settings.tabs.notifications.title'),
			icon: BellIcon,
			Content: SettingsNotificationsTab,
		},
		{
			value: 'billingPlans',
			label: t('settings.tabs.billingPlans.title'),
			icon: CreditCardIcon,
			Content: SettingsBillingPlansTab,
		},
	] as const satisfies SettingsTabItem[];

	return {
		settingsTabs,
	};
};
