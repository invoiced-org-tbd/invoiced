import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
	BellIcon,
	BotIcon,
	Building2Icon,
	CreditCardIcon,
	FileTextIcon,
	UserIcon,
} from 'lucide-react';
import z from 'zod';
import { SettingsAccountTab } from './settings-account-tab/SettingsAccountTab';
import { SettingsAutomationsTab } from './settings-automations-tab/SettingsAutomationsTab';
import { SettingsBillingTab } from './settings-billing-tab/SettingsBillingTab';
import { SettingsCompanyTab } from './settings-company-tab/SettingsCompanyTab';
import { SettingsNotificationsTab } from './settings-notifications-tab/SettingsNotificationsTab';
import { SettingsPlansTab } from './settings-plans-tab/SettingsPlansTab';
import type { TranslationKey } from '@/translations/types';

export const settingsTabSchema = z.enum([
	'account',
	'company',
	'automations',
	'notifications',
	'plans',
	'billing',
]);

export type SettingsTab = z.infer<typeof settingsTabSchema>;

export const settingsSearchSchema = z.object({
	tab: settingsTabSchema.optional(),
});

export const settingsTabs = [
	{
		value: 'account',
		labelKey: 'settings.tabs.account.title',
		icon: UserIcon,
		Content: SettingsAccountTab,
	},
	{
		value: 'company',
		labelKey: 'settings.tabs.company.title',
		icon: Building2Icon,
		Content: SettingsCompanyTab,
	},
	{
		value: 'automations',
		labelKey: 'settings.tabs.automations.title',
		icon: BotIcon,
		Content: SettingsAutomationsTab,
	},
	{
		value: 'notifications',
		labelKey: 'settings.tabs.notifications.title',
		icon: BellIcon,
		Content: SettingsNotificationsTab,
	},
	{
		value: 'plans',
		labelKey: 'settings.tabs.plans.title',
		icon: FileTextIcon,
		Content: SettingsPlansTab,
	},
	{
		value: 'billing',
		labelKey: 'settings.tabs.billing.title',
		icon: CreditCardIcon,
		Content: SettingsBillingTab,
	},
] as const satisfies {
	value: SettingsTab;
	labelKey: TranslationKey;
	icon: LucideIcon;
	Content: FC;
}[];
