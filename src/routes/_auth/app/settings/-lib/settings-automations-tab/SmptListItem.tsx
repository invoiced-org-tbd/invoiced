import type { GetSmtpConfigsResponse } from '@/api/smtp/getSmtpConfigs';
import { Button } from '@/components/button/Button';
import { DropdownMenu } from '@/components/dropdown-menu/DropdownMenu';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import {
	EllipsisVerticalIcon,
	MailIcon,
	PencilIcon,
	ServerIcon,
	Trash2Icon,
} from 'lucide-react';
import { useGetSmtpSecurityLabel } from './utils';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

type SmptListItemProps = {
	smtpConfig: GetSmtpConfigsResponse[number];
};
export const SmptListItem = ({ smtpConfig }: SmptListItemProps) => {
	const { t } = useTranslate();
	const navigate = settingsRouteApi.useNavigate();

	const { getSmtpSecurityLabel } = useGetSmtpSecurityLabel();

	const handleEditClick = () => {
		navigate({
			search: {
				tab: 'automations',
				automationResource: 'smtp',
				automationId: smtpConfig.id,
				isEditingAutomation: true,
			},
		});
	};

	const handleDeleteClick = () => {
		navigate({
			search: {
				tab: 'automations',
				automationResource: 'smtp',
				automationId: smtpConfig.id,
				isDeletingAutomation: true,
			},
		});
	};

	return (
		<div className='rounded-lg border p-4 space-y-4'>
			<div className='flex items-start justify-between gap-3'>
				<div className='space-y-2 min-w-0'>
					<p className='text-sm font-medium truncate'>{smtpConfig.name}</p>
					<p className='text-muted-foreground text-xs'>
						{getSmtpSecurityLabel({ security: smtpConfig.security })}
					</p>
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

			<div className='grid gap-3 sm:grid-cols-2'>
				<div>
					<p className='text-muted-foreground text-xs uppercase tracking-wide'>
						{t('settings.tabs.automations.smtp.senderLabel')}
					</p>
					<p className='mt-1 text-sm font-medium flex items-center gap-2'>
						<MailIcon className='size-4 text-muted-foreground' />
						{smtpConfig.fromEmail}
					</p>
				</div>
				<div>
					<p className='text-muted-foreground text-xs uppercase tracking-wide'>
						{t('settings.tabs.automations.smtp.hostLabel')}
					</p>
					<p className='mt-1 text-sm font-medium flex items-center gap-2'>
						<ServerIcon className='size-4 text-muted-foreground' />
						{smtpConfig.host}:{smtpConfig.port}
					</p>
				</div>
			</div>
		</div>
	);
};
