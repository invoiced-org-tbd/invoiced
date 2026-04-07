import { Drawer } from '@/components/drawer/Drawer';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { SmtpUpsertForm } from './SmtpUpsertForm';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

export const SmtpUpsertDrawer = () => {
	const { t } = useTranslate();

	const {
		isEditingAutomation,
		isCreatingAutomation,
		automationResource,
		automationId,
	} = settingsRouteApi.useSearch();
	const navigate = settingsRouteApi.useNavigate();

	const isSmptDrawer = automationResource === 'smtp';
	const isCreating = isCreatingAutomation && isSmptDrawer;
	const isEditing = isEditingAutomation && isSmptDrawer && !!automationId;
	const editId = isEditing ? automationId : undefined;

	const isOpen = isEditing || isCreating;

	const handleClose = () => {
		navigate({
			search: {
				tab: 'automations',
			},
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
							? t('settings.tabs.automations.smtp.drawer.editTitle')
							: t('settings.tabs.automations.smtp.drawer.title')}
					</Drawer.Title>
					<Drawer.Description>
						{isEditing
							? t('settings.tabs.automations.smtp.drawer.editDescription')
							: t('settings.tabs.automations.smtp.drawer.description')}
					</Drawer.Description>
				</Drawer.Header>

				<SmtpUpsertForm
					editId={editId}
					isEditing={isEditing}
					onClose={handleClose}
				/>
			</Drawer.Content>
		</Drawer.Root>
	);
};
