import { Button } from '@/components/button/Button';
import { ToggleSection } from '@/components/toggle-section/ToggleSection';
import { getEmailTemplatesQueryOptions } from '@/api/email-template/getEmailTemplates';
import { getSmtpConfigsQueryOptions } from '@/api/smtp/getSmtpConfigs';
import { withFieldGroup } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

export const ContractAutoSendForm = withFieldGroup({
	defaultValues: {} as ContractsUpsertFormSchema['autoSend'],
	render: ({ group }) => {
		const { t } = useTranslate();
		const { data: smtpConfigs, isPending: smtpPending } = useQuery(
			getSmtpConfigsQueryOptions(),
		);
		const { data: emailTemplates, isPending: templatesPending } = useQuery(
			getEmailTemplatesQueryOptions(),
		);

		const isLoading = smtpPending || templatesPending;
		const hasSmtp = !!smtpConfigs?.length;
		const hasTemplates = !!emailTemplates?.length;
		const canConfigure = hasSmtp && hasTemplates;

		const smtpItems =
			smtpConfigs?.map((config) => ({
				value: config.id,
				label: config.name,
			})) ?? [];

		const templateItems =
			emailTemplates?.map((template) => ({
				value: template.id,
				label: template.name,
			})) ?? [];

		return (
			<ToggleSection.Root
				open={true}
				variant='secondary'
			>
				<ToggleSection.Header>
					<ToggleSection.Title>
						{t('contracts.form.autoSend.sectionTitle')}
					</ToggleSection.Title>
					<ToggleSection.Description>
						{t('contracts.form.autoSend.sectionDescription')}
					</ToggleSection.Description>
				</ToggleSection.Header>

				<ToggleSection.Content className='space-y-4'>
					{isLoading ? (
						<p className='text-sm text-muted-foreground'>
							{t('contracts.form.autoSend.loading')}
						</p>
					) : !canConfigure ? (
						<div className='rounded-lg border border-dashed p-4 space-y-3'>
							<p className='text-sm font-medium'>
								{t('contracts.form.autoSend.zeroState.title')}
							</p>
							<p className='text-sm text-muted-foreground'>
								{t('contracts.form.autoSend.zeroState.description')}
							</p>
							<Button
								size='sm'
								variant='secondary'
								asChild
							>
								<Link
									to='/app/settings'
									search={(prev) => ({
										...prev,
										tab: 'automations',
									})}
								>
									{t('contracts.form.autoSend.zeroState.cta')}
								</Link>
							</Button>
						</div>
					) : (
						<>
							<group.AppField
								name='enabled'
								children={(field) => (
									<field.Switch
										label={t('contracts.form.autoSend.enabledLabel')}
										tooltip={t('contracts.form.autoSend.enabledDescription')}
									/>
								)}
							/>

							<group.Subscribe
								selector={(s) => ({ enabled: s.values.enabled })}
								children={({ enabled }) =>
									enabled ? (
										<div className='grid gap-4 sm:grid-cols-1'>
											<group.AppField
												name='smtpConfigId'
												children={(field) => (
													<field.SelectInput
														label={t('contracts.form.autoSend.smtpLabel')}
														tooltip={t(
															'contracts.form.autoSend.smtpDescription',
														)}
														items={smtpItems}
														placeholder={t(
															'contracts.form.autoSend.smtpPlaceholder',
														)}
														allowEmpty
													/>
												)}
											/>
											<group.AppField
												name='emailTemplateId'
												children={(field) => (
													<field.SelectInput
														label={t('contracts.form.autoSend.templateLabel')}
														tooltip={t(
															'contracts.form.autoSend.templateDescription',
														)}
														items={templateItems}
														placeholder={t(
															'contracts.form.autoSend.templatePlaceholder',
														)}
														allowEmpty
													/>
												)}
											/>
										</div>
									) : null
								}
							/>
						</>
					)}
				</ToggleSection.Content>
			</ToggleSection.Root>
		);
	},
});
