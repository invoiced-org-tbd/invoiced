import { deleteSmtpConfigMutationOptions } from '@/api/smtp/deleteSmtpConfig';
import { getSmtpConfigsQueryOptions } from '@/api/smtp/getSmtpConfigs';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { DeleteDialog } from '@/components/delete-dialog/DeleteDialog';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { SmptListItem } from './SmptListItem';
import { SmptZeroState } from './SmptZeroState';
import { SmtpUpsertDrawer } from './SmtpUpsertDrawer';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

export const SmtpConfigList = () => {
	const { t } = useTranslate();
	const navigate = settingsRouteApi.useNavigate();
	const { automationId, automationResource, isDeletingAutomation } =
		settingsRouteApi.useSearch();

	const {
		data: smtpConfigs,
		isPending,
		isError,
	} = useQuery(getSmtpConfigsQueryOptions());

	const handleCreateSmtpConfigClick = () => {
		navigate({
			search: {
				tab: 'automations',
				automationResource: 'smtp',
				isCreatingAutomation: true,
			},
		});
	};

	const isDeleteDialogOpen =
		!!isDeletingAutomation && !!automationId && automationResource === 'smtp';

	const handleCloseDeleteDialog = () => {
		navigate({
			search: {
				tab: 'automations',
			},
		});
	};

	if (isPending || isError) {
		return;
	}

	return (
		<>
			<Card.Root className='overflow-hidden border-primary/20'>
				<Card.Header className='flex-row items-center justify-between gap-4 border-b border-primary/20 bg-linear-to-br from-primary/10 via-transparent to-muted/30'>
					<div className='space-y-1'>
						<Card.Title>{t('settings.tabs.automations.smtp.title')}</Card.Title>
						<Card.Description>
							{t('settings.tabs.automations.smtp.description')}
						</Card.Description>
					</div>
					<Button
						size='sm'
						onClick={handleCreateSmtpConfigClick}
					>
						<PlusIcon className='size-4' />
						{t('settings.tabs.automations.actions.add')}
					</Button>
				</Card.Header>

				<Card.Content className='space-y-3 pt-6'>
					{smtpConfigs.length ? (
						smtpConfigs.map((smtpConfig) => {
							return (
								<SmptListItem
									key={smtpConfig.id}
									smtpConfig={smtpConfig}
								/>
							);
						})
					) : (
						<SmptZeroState />
					)}
				</Card.Content>
			</Card.Root>

			<SmtpUpsertDrawer />
			<DeleteDialog
				title={t('entity.deleteTitle', {
					entity: t('settings.tabs.automations.smtp.entityName'),
				})}
				description={t('entity.deleteConfirmation', {
					entity: t('settings.tabs.automations.smtp.entityName'),
				})}
				selectedId={automationId ?? ''}
				open={isDeleteDialogOpen}
				onClose={handleCloseDeleteDialog}
				deleteMutationOptions={deleteSmtpConfigMutationOptions()}
			/>
		</>
	);
};
