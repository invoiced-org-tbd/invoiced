import { Drawer } from '@/components/drawer/Drawer';
import type { GetCompanyResponse } from '@/api/company/getCompany';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { UpsertCompanyForm } from './UpsertCompanyForm';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

type UpsertCompanyDrawerProps = {
	company: GetCompanyResponse;
};

export const UpsertCompanyDrawer = ({ company }: UpsertCompanyDrawerProps) => {
	const { t } = useTranslate();
	const { companyAction } = settingsRouteApi.useSearch();
	const navigate = settingsRouteApi.useNavigate();

	const isOpen = !!companyAction;
	const isEditing = companyAction === 'edit';
	const mode = isEditing && company ? 'edit' : 'create';

	const handleClose = () => {
		navigate({
			search: (prev) => ({
				...prev,
				companyAction: undefined,
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
						{isEditing
							? t('settings.tabs.company.drawer.editTitle')
							: t('settings.tabs.company.drawer.title')}
					</Drawer.Title>
					<Drawer.Description>
						{isEditing
							? t('settings.tabs.company.drawer.editDescription')
							: t('settings.tabs.company.drawer.description')}
					</Drawer.Description>
				</Drawer.Header>
				<UpsertCompanyForm
					mode={mode}
					company={mode === 'edit' ? company : undefined}
					onSuccess={handleClose}
					onClose={handleClose}
				/>
			</Drawer.Content>
		</Drawer.Root>
	);
};
