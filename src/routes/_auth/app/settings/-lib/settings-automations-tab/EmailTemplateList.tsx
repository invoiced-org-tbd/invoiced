import { getEmailTemplatesQueryOptions } from '@/api/email-template/getEmailTemplates';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { EmailTemplateItem } from './EmailTemplateItem';
import { EmailTemplateZeroState } from './EmailTemplateZeroState';
import { UpsertEmailTemplateDrawer } from './UpsertEmailTemplateDrawer';
import { EmailTemplateDeleteDialog } from './EmailTemplateDeleteDialog';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

export const EmailTemplateList = () => {
	const navigate = settingsRouteApi.useNavigate();

	const { t } = useTranslate();

	const {
		data: emailTemplates,
		isPending,
		isError,
	} = useQuery(getEmailTemplatesQueryOptions());

	const handleCreateEmailTemplateClick = () => {
		navigate({
			search: (prev) => ({
				...prev,
				automationResource: 'emailTemplate',
				isCreatingAutomation: true,
			}),
		});
	};

	if (isPending || isError) {
		return null;
	}

	return (
		<>
			<Card.Root className='overflow-hidden border-primary/20'>
				<Card.Header className='flex-row items-center justify-between gap-4 border-b border-primary/20 bg-linear-to-br from-primary/10 via-transparent to-muted/30'>
					<div className='space-y-1'>
						<Card.Title>
							{t('settings.tabs.automations.emailTemplates.title')}
						</Card.Title>
						<Card.Description>
							{t('settings.tabs.automations.emailTemplates.description')}
						</Card.Description>
					</div>
					<Button
						size='sm'
						onClick={handleCreateEmailTemplateClick}
					>
						<PlusIcon className='size-4' />
						{t('settings.tabs.automations.actions.add')}
					</Button>
				</Card.Header>

				<Card.Content className='space-y-3 pt-6'>
					{emailTemplates.length ? (
						emailTemplates.map((emailTemplate) => {
							return (
								<EmailTemplateItem
									key={emailTemplate.id}
									emailTemplate={emailTemplate}
								/>
							);
						})
					) : (
						<EmailTemplateZeroState />
					)}
				</Card.Content>
			</Card.Root>

			<UpsertEmailTemplateDrawer />
			<EmailTemplateDeleteDialog />
		</>
	);
};
