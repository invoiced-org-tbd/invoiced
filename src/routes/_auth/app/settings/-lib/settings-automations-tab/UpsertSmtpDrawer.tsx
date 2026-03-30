import { Drawer } from '@/components/drawer/Drawer';
import type { GetSmtpConfigsResponse } from '@/api/smtp/getSmtpConfigs';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { UpsertSmtpForm } from './UpsertSmtpForm';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

type UpsertSmtpDrawerProps = {
	smtpConfigs: GetSmtpConfigsResponse;
};

export const UpsertSmtpDrawer = ({ smtpConfigs }: UpsertSmtpDrawerProps) => {
	const { t } = useTranslate();
	const { automationAction, automationId, automationResource } =
		settingsRouteApi.useSearch();
	const navigate = settingsRouteApi.useNavigate();
	const smtpConfig = smtpConfigs.find((item) => item.id === automationId);

	const isSmtpDrawer = automationResource === 'smtp' && !!automationAction;
	const isEditing = automationAction === 'edit' && !!smtpConfig;
	const mode = isEditing ? 'edit' : 'create';
	const onClose = () => {
		navigate({
			search: (prev) => ({
				...prev,
				automationAction: undefined,
				automationResource: undefined,
				automationId: undefined,
			}),
		});
	};

	return (
		<Drawer.Root
			open={isSmtpDrawer}
			onOpenChange={onClose}
		>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>
						{isEditing
							? t('settings.tabs.automations.smtp.drawer.editTitle')
							: t('settings.tabs.automations.smtp.drawer.title')}
					</Drawer.Title>
					<Drawer.Description>
						{isEditing
							? t('settings.tabs.automations.smtp.drawer.editDescription')
							: t('settings.tabs.automations.smtp.drawer.description')}
					</Drawer.Description>
				</Drawer.Header>
				<UpsertSmtpForm
					mode={mode}
					smtpConfig={smtpConfig}
					onClose={onClose}
					onSuccess={onClose}
				/>
			</Drawer.Content>
		</Drawer.Root>
	);
};
