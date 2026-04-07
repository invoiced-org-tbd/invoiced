import { Drawer } from '@/components/drawer/Drawer';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { UpsertEmailTemplateForm } from './UpsertEmailTemplateForm';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

export const UpsertEmailTemplateDrawer = () => {
	const { t } = useTranslate();
	const {
		isCreatingAutomation,
		isEditingAutomation,
		automationId,
		automationResource,
		isDuplicatingEmailTemplate,
	} = settingsRouteApi.useSearch();
	const navigate = settingsRouteApi.useNavigate();

	const isEmailTemplateDrawer = automationResource === 'emailTemplate';
	const isCreating = isCreatingAutomation && isEmailTemplateDrawer;
	const isEditing =
		isEditingAutomation && isEmailTemplateDrawer && !!automationId;
	const isDuplicating =
		isDuplicatingEmailTemplate && isEmailTemplateDrawer && !!automationId;
	const editId = isEditing || isDuplicating ? automationId : undefined;

	const isOpen = isCreating || isEditing || isDuplicating;

	const handleClose = () => {
		navigate({
			search: {
				tab: 'automations',
			},
		});
	};

	const getTitle = () => {
		if (isEditing) {
			return t('settings.tabs.automations.emailTemplates.drawer.editTitle');
		}
		if (isDuplicating) {
			return t(
				'settings.tabs.automations.emailTemplates.drawer.duplicateTitle',
			);
		}

		return t('settings.tabs.automations.emailTemplates.drawer.title');
	};
	const title = getTitle();

	const getDescription = () => {
		if (isEditing) {
			return t(
				'settings.tabs.automations.emailTemplates.drawer.editDescription',
			);
		}
		if (isDuplicating) {
			return t(
				'settings.tabs.automations.emailTemplates.drawer.duplicateDescription',
			);
		}
		return t('settings.tabs.automations.emailTemplates.drawer.description');
	};
	const description = getDescription();

	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={handleClose}
		>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>{title}</Drawer.Title>
					<Drawer.Description>{description}</Drawer.Description>
				</Drawer.Header>

				<UpsertEmailTemplateForm
					editId={editId}
					isEditing={isEditing}
					isDuplicating={isDuplicating}
					onClose={handleClose}
				/>
			</Drawer.Content>
		</Drawer.Root>
	);
};
