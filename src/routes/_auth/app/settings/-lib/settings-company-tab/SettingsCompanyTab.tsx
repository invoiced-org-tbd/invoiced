import { useCompany } from '@/hooks/use-company/useCompany';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { CompanyUpsertDrawer } from './CompanyUpsertDrawer';
import { CompanyZeroState } from './CompanyZeroState';
import { CompanyProfile } from './CompanyProfile';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

export const SettingsCompanyTab = () => {
	const { t } = useTranslate();
	const { company } = useCompany();
	const navigate = settingsRouteApi.useNavigate();

	const handleSetupCompanyClick = () => {
		navigate({
			search: (prev) => ({
				...prev,
				isSettingUpCompany: true,
			}),
		});
	};

	const handleEditCompanyClick = () => {
		navigate({
			search: (prev) => ({
				...prev,
				isEditingCompany: true,
			}),
		});
	};

	return (
		<div className='rounded-lg px-6 space-y-6'>
			<header className='space-y-2'>
				<h2 className='text-lg font-semibold'>
					{t('settings.tabs.company.title')}
				</h2>
				<p className='text-muted-foreground text-sm'>
					{t('settings.tabs.company.description')}
				</p>
			</header>

			{company ? (
				<CompanyProfile onEditCompanyClick={handleEditCompanyClick} />
			) : (
				<CompanyZeroState onSetupCompanyClick={handleSetupCompanyClick} />
			)}

			<CompanyUpsertDrawer />
		</div>
	);
};
