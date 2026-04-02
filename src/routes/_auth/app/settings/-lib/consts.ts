import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
	BellIcon,
	BotIcon,
	Building2Icon,
	CreditCardIcon,
	UserIcon,
} from 'lucide-react';
import z from 'zod';
import { SettingsAccountTab } from './settings-account-tab/SettingsAccountTab';
import { SettingsAutomationsTab } from './settings-automations-tab/SettingsAutomationsTab';
import { SettingsBillingPlansTab } from './settings-billing-plans-tab/SettingsBillingPlansTab';
import { SettingsCompanyTab } from './settings-company-tab/SettingsCompanyTab';
import { SettingsNotificationsTab } from './settings-notifications-tab/SettingsNotificationsTab';
import type { TranslationKey } from '@/translations/types';

export const settingsTabSchema = z.enum([
	'account',
	'company',
	'automations',
	'notifications',
	'billingPlans',
]);

export type SettingsTab = z.infer<typeof settingsTabSchema>;
const settingsCompanyDrawerActionSchema = z.enum(['create', 'edit']);

const settingsAutomationDrawerActionSchema = z.enum(['create', 'edit']);

const settingsAutomationResourceSchema = z.enum(['smtp', 'emailTemplate']);

export const settingsSearchSchema = z.object({
	tab: settingsTabSchema.optional(),
	companyAction: settingsCompanyDrawerActionSchema.optional(),
	automationAction: settingsAutomationDrawerActionSchema.optional(),
	automationResource: settingsAutomationResourceSchema.optional(),
	automationId: z.string().optional(),
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
		value: 'billingPlans',
		labelKey: 'settings.tabs.billingPlans.title',
		icon: CreditCardIcon,
		Content: SettingsBillingPlansTab,
	},
] as const satisfies {
	value: SettingsTab;
	labelKey: TranslationKey;
	icon: LucideIcon;
	Content: FC;
}[];
