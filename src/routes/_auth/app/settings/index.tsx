import { Page } from '@/components/page/Page';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { SettingsTabs } from './-lib/settings-tabs/SettingsTabs';
import { settingsSearchSchema, settingsTabSchema } from './-lib/consts';

export const Route = createFileRoute('/_auth/app/settings/')({
	validateSearch: zodValidator(settingsSearchSchema),
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslate();
	const { tab } = Route.useSearch();
	const navigate = Route.useNavigate();

	const activeTab = tab ?? 'account';

	const handleTabChange = (value: string) => {
		const parsedTab = settingsTabSchema.safeParse(value);
		if (!parsedTab.success) {
			return;
		}

		navigate({
			search: (prev) => ({
				...prev,
				tab: parsedTab.data,
				companyAction:
					parsedTab.data === 'company' ? prev.companyAction : undefined,
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
