import { Drawer } from '@/components/drawer/Drawer';
import type { GetEmailTemplatesResponse } from '@/api/email-template/getEmailTemplates';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { UpsertEmailTemplateForm } from './UpsertEmailTemplateForm';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

type UpsertEmailTemplateDrawerProps = {
	emailTemplates: GetEmailTemplatesResponse;
};

export const UpsertEmailTemplateDrawer = ({
	emailTemplates,
}: UpsertEmailTemplateDrawerProps) => {
	const { t } = useTranslate();
	const { automationAction, automationId, automationResource } =
		settingsRouteApi.useSearch();
	const navigate = settingsRouteApi.useNavigate();
	const emailTemplate = emailTemplates.find((item) => item.id === automationId);

	const isEmailTemplateDrawer =
		automationResource === 'emailTemplate' && !!automationAction;
	const isEditing = automationAction === 'edit' && !!emailTemplate;
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
			open={isEmailTemplateDrawer}
			onOpenChange={onClose}
		>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>
						{isEditing
							? t('settings.tabs.automations.emailTemplates.drawer.editTitle')
							: t('settings.tabs.automations.emailTemplates.drawer.title')}
					</Drawer.Title>
					<Drawer.Description>
						{isEditing
							? t(
									'settings.tabs.automations.emailTemplates.drawer.editDescription',
								)
							: t(
									'settings.tabs.automations.emailTemplates.drawer.description',
								)}
					</Drawer.Description>
				</Drawer.Header>
				<UpsertEmailTemplateForm
					mode={mode}
					emailTemplate={emailTemplate}
					onClose={onClose}
					onSuccess={onClose}
				/>
			</Drawer.Content>
		</Drawer.Root>
	);
};
