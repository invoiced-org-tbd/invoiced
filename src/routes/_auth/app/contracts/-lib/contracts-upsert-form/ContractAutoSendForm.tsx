import { Button } from '@/components/button/Button';
import { ToggleSection } from '@/components/toggle-section/ToggleSection';
import { getEmailTemplatesQueryOptions } from '@/api/email-template/getEmailTemplates';
import { getSubscriptionQueryOptions } from '@/api/subscription/getSubscription';
import { PLAN_LIMITS } from '@/lib/planLimits';
import { withFieldGroup } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

export const ContractAutoSendForm = withFieldGroup({
	defaultValues: {} as ContractsUpsertFormSchema['autoSend'],
	render: ({ group }) => {
		const { t } = useTranslate();
		const { data: emailTemplates, isPending: templatesPending } = useQuery(
			getEmailTemplatesQueryOptions(),
		);
		const { data: subscription } = useQuery(getSubscriptionQueryOptions());
		const plan = subscription?.plan ?? 'starter';
		const canUseAutoSend =
			PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS].autoSend;

		const isLoading = templatesPending;
		const hasTemplates = !!emailTemplates?.length;

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
					{!canUseAutoSend ? (
						<div className='rounded-lg border border-dashed p-4 space-y-2'>
							<p className='text-sm font-medium'>
								{t('contracts.form.autoSend.proOnly.title')}
							</p>
							<p className='text-sm text-muted-foreground'>
								{t('contracts.form.autoSend.proOnly.description')}
							</p>
						</div>
					) : isLoading ? (
						<p className='text-sm text-muted-foreground'>
							{t('contracts.form.autoSend.loading')}
						</p>
					) : !hasTemplates ? (
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
