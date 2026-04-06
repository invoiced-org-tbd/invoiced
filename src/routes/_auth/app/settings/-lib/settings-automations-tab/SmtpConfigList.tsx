import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { PlusIcon } from 'lucide-react';
import { SmptListItem } from './SmptListItem';
import { SmptZeroState } from './SmptZeroState';
import { useQuery } from '@tanstack/react-query';
import { getSmtpConfigsQueryOptions } from '@/api/smtp/getSmtpConfigs';
import { getRouteApi } from '@tanstack/react-router';
import { SmtpUpsertDrawer } from './SmtpUpsertDrawer';
import { SmtpDeleteDialog } from './SmtpDeleteDialog';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

export const SmtpConfigList = () => {
	const { t } = useTranslate();
	const navigate = settingsRouteApi.useNavigate();

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
			<SmtpDeleteDialog />
		</>
	);
};
