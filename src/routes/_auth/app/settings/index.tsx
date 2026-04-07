import { Page } from '@/components/page/Page';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { SettingsTabs } from './-lib/settings-tabs/SettingsTabs';

export const settingsTabsSchema = z.enum([
	'account',
	'company',
	'invoice',
	'automations',
	'notifications',
	'billingPlans',
]);

export type SettingsTab = z.infer<typeof settingsTabsSchema>;

const settingsSearchSchema = z.object({
	tab: settingsTabsSchema.optional(),

	isEditingCompany: z.boolean().optional(),
	isSettingUpCompany: z.boolean().optional(),
	isEditingInvoiceConfiguration: z.boolean().optional(),

	isCreatingAutomation: z.boolean().optional(),
	isEditingAutomation: z.boolean().optional(),
	isDuplicatingEmailTemplate: z.boolean().optional(),
	isDeletingAutomation: z.boolean().optional(),
	automationId: z.string().optional(),
	automationResource: z.enum(['smtp', 'emailTemplate']).optional(),
});

export const Route = createFileRoute('/_auth/app/settings/')({
	validateSearch: zodValidator(settingsSearchSchema),
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslate();
	const { tab } = Route.useSearch();
	const navigate = Route.useNavigate();

	const activeTab = tab ?? settingsTabsSchema.options[0];

	const handleTabChange = (value: SettingsTab) => {
		navigate({
			search: (prev) => ({
				...prev,
				tab: value,
			}),
		});
	};

	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>{t('settings.title')}</Page.Title>
			</Page.Header>

			<Page.Content>
				<SettingsTabs
					activeTab={activeTab}
					onTabChange={handleTabChange}
				/>
			</Page.Content>
		</Page.Root>
	);
}
