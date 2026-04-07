import type { GetEmailTemplatesResponse } from '@/api/email-template/getEmailTemplates';
import { DropdownMenu } from '@/components/dropdown-menu/DropdownMenu';
import { Button } from '@/components/button/Button';
import {
	EllipsisVerticalIcon,
	PencilIcon,
	CopyIcon,
	Trash2Icon,
} from 'lucide-react';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { formatUpdatedAt } from '@/utils/dateUtils';
import { useLanguage } from '@/hooks/use-language/useLanguage';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

type EmailTemplateItemProps = {
	emailTemplate: GetEmailTemplatesResponse[number];
};
export const EmailTemplateItem = ({
	emailTemplate,
}: EmailTemplateItemProps) => {
	const navigate = settingsRouteApi.useNavigate();

	const { t } = useTranslate();
	const { language } = useLanguage();

	const handleEditClick = () => {
		navigate({
			search: {
				tab: 'automations',
				automationResource: 'emailTemplate',
				isEditingAutomation: true,
				automationId: emailTemplate.id,
			},
		});
	};

	const handleDuplicateClick = () => {
		navigate({
			search: {
				tab: 'automations',
				automationResource: 'emailTemplate',
				isDuplicatingEmailTemplate: true,
				automationId: emailTemplate.id,
			},
		});
	};

	const handleDeleteClick = () => {
		navigate({
			search: {
				tab: 'automations',
				automationResource: 'emailTemplate',
				isDeletingAutomation: true,
				automationId: emailTemplate.id,
			},
		});
	};

	return (
		<div className='rounded-lg border p-4 space-y-4'>
			<div className='flex items-start justify-between gap-3'>
				<div className='space-y-2 min-w-0'>
					<p className='text-sm font-medium truncate'>{emailTemplate.name}</p>
					<p className='text-muted-foreground text-xs'>{emailTemplate.slug}</p>
				</div>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild>
						<Button
							size='sm'
							variant='secondary'
							isIcon
						>
							<EllipsisVerticalIcon className='size-4' />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align='end'>
						<DropdownMenu.Item onClick={handleEditClick}>
							<PencilIcon className='size-4' />
							{t('common.edit')}
						</DropdownMenu.Item>
						<DropdownMenu.Item onClick={handleDuplicateClick}>
							<CopyIcon className='size-4' />
							{t('settings.tabs.automations.actions.duplicate')}
						</DropdownMenu.Item>
						<DropdownMenu.Item
							variant='destructive'
							onClick={handleDeleteClick}
						>
							<Trash2Icon className='size-4' />
							{t('common.delete')}
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>

			<div className='space-y-3'>
				<div>
					<p className='text-muted-foreground text-xs uppercase tracking-wide'>
						{t('settings.tabs.automations.emailTemplates.subjectLabel')}
					</p>
					<p className='mt-1 text-sm font-medium line-clamp-2'>
						{emailTemplate.subject}
					</p>
				</div>
				<div>
					<p className='text-muted-foreground text-xs uppercase tracking-wide'>
						{t('settings.tabs.automations.emailTemplates.updatedAtLabel')}
					</p>
					<p className='mt-1 text-sm font-medium'>
						{formatUpdatedAt({ date: emailTemplate.updatedAt, language })}
					</p>
				</div>
			</div>
		</div>
	);
};
