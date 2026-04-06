import { deleteSmtpConfigMutationOptions } from '@/api/smtp/deleteSmtpConfig';
import { Button } from '@/components/button/Button';
import { Dialog } from '@/components/dialog/Dialog';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

export const SmtpDeleteDialog = () => {
	const { isDeletingAutomation, automationId, automationResource } =
		settingsRouteApi.useSearch();
	const navigate = settingsRouteApi.useNavigate();

	const { t } = useTranslate();

	const isOpen =
		isDeletingAutomation && !!automationId && automationResource === 'smtp';

	const { mutateAsync: deleteSmtp, isPending } = useMutation(
		deleteSmtpConfigMutationOptions(),
	);

	const handleClose = () => {
		navigate({
			search: {
				tab: 'automations',
			},
		});
	};

	const handleDelete = async () => {
		if (!automationId) {
			return;
		}

		await deleteSmtp({ id: automationId });
		handleClose();
	};

	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={handleClose}
		>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>
						{t('entity.deleteTitle', {
							entity: t('settings.tabs.automations.smtp.entityName'),
						})}
					</Dialog.Title>
					<Dialog.Description>
						{t('entity.deleteConfirmation', {
							entity: t('settings.tabs.automations.smtp.entityName'),
						})}
					</Dialog.Description>
				</Dialog.Header>

				<Dialog.Footer>
					<Dialog.Close asChild>
						<Button
							variant='secondary'
							onClick={handleClose}
							disabled={isPending}
						>
							{t('common.cancel')}
						</Button>
					</Dialog.Close>

					<Button
						variant='destructive'
						onClick={handleDelete}
						isLoading={isPending}
					>
						{t('common.delete')}
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
