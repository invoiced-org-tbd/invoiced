import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { DropdownMenu } from '@/components/dropdown-menu/DropdownMenu';
import { createEmailTemplateMutationOptions } from '@/api/email-template/createEmailTemplate';
import { deleteEmailTemplateMutationOptions } from '@/api/email-template/deleteEmailTemplate';
import { deleteSmtpConfigMutationOptions } from '@/api/smtp/deleteSmtpConfig';
import { useEmailTemplates } from '@/hooks/use-email-templates/useEmailTemplates';
import { useSmtpConfigs } from '@/hooks/use-smtp-configs/useSmtpConfigs';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import {
	CopyIcon,
	EllipsisVerticalIcon,
	MailIcon,
	PencilIcon,
	PlusIcon,
	ServerIcon,
	Trash2Icon,
} from 'lucide-react';
import { UpsertEmailTemplateDrawer } from './UpsertEmailTemplateDrawer';
import { UpsertSmtpDrawer } from './UpsertSmtpDrawer';

const settingsRouteApi = getRouteApi('/_auth/app/settings/');

export const SettingsAutomationsTab = () => {
	const { t } = useTranslate();
	const navigate = settingsRouteApi.useNavigate();
	const { smtpConfigs } = useSmtpConfigs();
	const { emailTemplates } = useEmailTemplates();
	const { mutateAsync: deleteSmtpConfig } = useMutation(
		deleteSmtpConfigMutationOptions(),
	);
	const { mutateAsync: deleteEmailTemplate } = useMutation(
		deleteEmailTemplateMutationOptions(),
	);
	const { mutateAsync: createEmailTemplate } = useMutation(
		createEmailTemplateMutationOptions(),
	);

	const getSmtpSecurityLabel = (security: 'none' | 'ssl_tls' | 'starttls') => {
		switch (security) {
			case 'starttls':
				return t('settings.tabs.automations.smtp.securityModes.starttls');
			case 'ssl_tls':
				return t('settings.tabs.automations.smtp.securityModes.sslTls');
			default:
				return t('settings.tabs.automations.smtp.securityModes.none');
		}
	};

	const formatDate = (date: Date) => {
		const parsedDate = date instanceof Date ? date : new Date(date);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
		}).format(parsedDate);
	};

	return (
		<div className='rounded-lg px-6 space-y-6'>
			<header className='space-y-2'>
				<h2 className='text-lg font-semibold'>
					{t('settings.tabs.automations.title')}
				</h2>
				<p className='text-muted-foreground text-sm'>
					{t('settings.tabs.automations.description')}
				</p>
			</header>

			<div className='grid gap-4 lg:grid-cols-2'>
				<Card.Root className='overflow-hidden border-primary/20'>
					<Card.Header className='flex-row items-center justify-between gap-4 border-b border-primary/20 bg-linear-to-br from-primary/10 via-transparent to-muted/30'>
						<div className='space-y-1'>
							<Card.Title>
								{t('settings.tabs.automations.smtp.title')}
							</Card.Title>
							<Card.Description>
								{t('settings.tabs.automations.smtp.description')}
							</Card.Description>
						</div>
						<Button
							size='sm'
							onClick={() =>
								navigate({
									search: (prev) => ({
										...prev,
										tab: 'automations',
										automationResource: 'smtp',
										automationAction: 'create',
										automationId: undefined,
									}),
								})
							}
						>
							<PlusIcon className='size-4' />
							{t('settings.tabs.automations.actions.add')}
						</Button>
					</Card.Header>
					<Card.Content className='space-y-3 pt-6'>
						{smtpConfigs.length ? (
							smtpConfigs.map((smtpConfig) => (
								<div
									key={smtpConfig.id}
									className='rounded-lg border p-4 space-y-4'
								>
									<div className='flex items-start justify-between gap-3'>
										<div className='space-y-2 min-w-0'>
											<p className='text-sm font-medium truncate'>
												{smtpConfig.name}
											</p>
											<p className='text-muted-foreground text-xs'>
												{getSmtpSecurityLabel(smtpConfig.security)}
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
												<DropdownMenu.Item
													onClick={() =>
														navigate({
															search: (prev) => ({
																...prev,
																tab: 'automations',
																automationResource: 'smtp',
																automationAction: 'edit',
																automationId: smtpConfig.id,
															}),
														})
													}
												>
													<PencilIcon className='size-4' />
													{t('common.edit')}
												</DropdownMenu.Item>
												<DropdownMenu.Item
													variant='destructive'
													onClick={() =>
														deleteSmtpConfig({ id: smtpConfig.id })
													}
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
							))
						) : (
							<div className='rounded-lg border border-dashed p-6 space-y-1'>
								<p className='text-sm font-medium'>
									{t('settings.tabs.automations.smtp.emptyState.title')}
								</p>
								<p className='text-muted-foreground text-sm'>
									{t('settings.tabs.automations.smtp.emptyState.description')}
								</p>
							</div>
						)}
					</Card.Content>
				</Card.Root>

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
							onClick={() =>
								navigate({
									search: (prev) => ({
										...prev,
										tab: 'automations',
										automationResource: 'emailTemplate',
										automationAction: 'create',
										automationId: undefined,
									}),
								})
							}
						>
							<PlusIcon className='size-4' />
							{t('settings.tabs.automations.actions.add')}
						</Button>
					</Card.Header>
					<Card.Content className='space-y-3 pt-6'>
						{emailTemplates.length ? (
							emailTemplates.map((emailTemplate) => (
								<div
									key={emailTemplate.id}
									className='rounded-lg border p-4 space-y-4'
								>
									<div className='flex items-start justify-between gap-3'>
										<div className='space-y-2 min-w-0'>
											<p className='text-sm font-medium truncate'>
												{emailTemplate.name}
											</p>
											<p className='text-muted-foreground text-xs'>
												{emailTemplate.slug}
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
												<DropdownMenu.Item
													onClick={() =>
														navigate({
															search: (prev) => ({
																...prev,
																tab: 'automations',
																automationResource: 'emailTemplate',
																automationAction: 'edit',
																automationId: emailTemplate.id,
															}),
														})
													}
												>
													<PencilIcon className='size-4' />
													{t('common.edit')}
												</DropdownMenu.Item>
												<DropdownMenu.Item
													onClick={() =>
														createEmailTemplate({
															name: `${emailTemplate.name} ${t(
																'settings.tabs.automations.copySuffix',
															)}`,
															slug: `${emailTemplate.slug}-copy`,
															subject: emailTemplate.subject,
															body: emailTemplate.body,
														})
													}
												>
													<CopyIcon className='size-4' />
													{t('settings.tabs.automations.actions.duplicate')}
												</DropdownMenu.Item>
												<DropdownMenu.Item
													variant='destructive'
													onClick={() =>
														deleteEmailTemplate({ id: emailTemplate.id })
													}
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
												{t(
													'settings.tabs.automations.emailTemplates.subjectLabel',
												)}
											</p>
											<p className='mt-1 text-sm font-medium line-clamp-2'>
												{emailTemplate.subject}
											</p>
										</div>
										<div>
											<p className='text-muted-foreground text-xs uppercase tracking-wide'>
												{t(
													'settings.tabs.automations.emailTemplates.updatedAtLabel',
												)}
											</p>
											<p className='mt-1 text-sm font-medium'>
												{formatDate(emailTemplate.updatedAt)}
											</p>
										</div>
									</div>
								</div>
							))
						) : (
							<div className='rounded-lg border border-dashed p-6 space-y-1'>
								<p className='text-sm font-medium'>
									{t(
										'settings.tabs.automations.emailTemplates.emptyState.title',
									)}
								</p>
								<p className='text-muted-foreground text-sm'>
									{t(
										'settings.tabs.automations.emailTemplates.emptyState.description',
									)}
								</p>
							</div>
						)}
					</Card.Content>
				</Card.Root>
			</div>

			<UpsertSmtpDrawer smtpConfigs={smtpConfigs} />
			<UpsertEmailTemplateDrawer emailTemplates={emailTemplates} />
		</div>
	);
};
