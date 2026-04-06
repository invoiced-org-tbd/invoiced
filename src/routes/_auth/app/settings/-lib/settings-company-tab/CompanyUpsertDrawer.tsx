import { Drawer } from '@/components/drawer/Drawer';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { CompanyUpsertForm } from './CompanyUpsertForm';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

export const CompanyUpsertDrawer = () => {
	const { isSettingUpCompany, isEditingCompany } = settingsRouteApi.useSearch();
	const navigate = settingsRouteApi.useNavigate();

	const { t } = useTranslate();

	const isOpen = isSettingUpCompany || isEditingCompany;

	const handleClose = () => {
		navigate({
			search: (prev) => ({
				...prev,
				isSettingUpCompany: undefined,
				isEditingCompany: undefined,
			}),
		});
	};

	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={handleClose}
		>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>
						{isSettingUpCompany
							? t('settings.tabs.company.drawer.editTitle')
							: t('settings.tabs.company.drawer.title')}
					</Drawer.Title>
					<Drawer.Description>
						{isSettingUpCompany
							? t('settings.tabs.company.drawer.editDescription')
							: t('settings.tabs.company.drawer.description')}
					</Drawer.Description>
				</Drawer.Header>
				<CompanyUpsertForm
					isEditingCompany={isEditingCompany}
					onClose={handleClose}
				/>
			</Drawer.Content>
		</Drawer.Root>
	);
};
