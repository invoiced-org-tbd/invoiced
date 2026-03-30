import { Drawer } from '@/components/drawer/Drawer';
import { createSmtpConfigMutationOptions } from '@/api/smtp/createSmtpConfig';
import type { GetSmtpConfigsResponse } from '@/api/smtp/getSmtpConfigs';
import { smtpUpsertSchema } from '@/api/smtp/smtpUpsertSchema';
import type { SmtpUpsertSchema } from '@/api/smtp/smtpUpsertSchema';
import { updateSmtpConfigMutationOptions } from '@/api/smtp/updateSmtpConfig';
import { Button } from '@/components/button/Button';
import { SelectInput } from '@/components/select-input/SelectInput';
import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

type UpsertSmtpFormProps = {
	mode: 'create' | 'edit';
	smtpConfig?: GetSmtpConfigsResponse[number];
	onClose: () => void;
	onSuccess: () => void;
};

type SmtpProviderPreset = 'gmail' | 'outlook' | 'mailgun' | 'sendgrid';

const smtpProviderPresets: Record<
	SmtpProviderPreset,
	{ host: string; port: number; security: SmtpUpsertSchema['security'] }
> = {
	gmail: { host: 'smtp.gmail.com', port: 587, security: 'starttls' },
	outlook: { host: 'smtp.office365.com', port: 587, security: 'starttls' },
	mailgun: { host: 'smtp.mailgun.org', port: 587, security: 'starttls' },
	sendgrid: { host: 'smtp.sendgrid.net', port: 587, security: 'starttls' },
};

const toDefaultValues = (
	mode: UpsertSmtpFormProps['mode'],
	smtpConfig?: GetSmtpConfigsResponse[number],
): SmtpUpsertSchema => {
	if (mode === 'edit' && smtpConfig) {
		return {
			name: smtpConfig.name,
			username: smtpConfig.username,
			password: '',
			fromName: smtpConfig.fromName ?? '',
			fromEmail: smtpConfig.fromEmail,
			host: smtpConfig.host,
			port: smtpConfig.port,
			security: smtpConfig.security,
		};
	}

	return {
		name: '',
		username: '',
		password: '',
		fromName: '',
		fromEmail: '',
		host: '',
		port: 587,
		security: 'starttls',
	};
};

export const UpsertSmtpForm = ({
	mode,
	smtpConfig,
	onClose,
	onSuccess,
}: UpsertSmtpFormProps) => {
	const { t } = useTranslate();
	const [selectedPreset, setSelectedPreset] = useState<
		SmtpProviderPreset | undefined
	>();
	const { mutateAsync: createSmtpConfig } = useMutation(
		createSmtpConfigMutationOptions(),
	);
	const { mutateAsync: updateSmtpConfig } = useMutation(
		updateSmtpConfigMutationOptions(),
	);
	const form = useAppForm({
		defaultValues: toDefaultValues(mode, smtpConfig),
		validators: {
			onChange: smtpUpsertSchema,
		},
		onSubmit: async ({ value }) => {
			if (mode === 'edit' && smtpConfig) {
				await updateSmtpConfig({
					id: smtpConfig.id,
					...value,
					password: value.password || undefined,
				});
			} else {
				await createSmtpConfig(value);
			}
			onSuccess();
		},
	});

	const applyPreset = () => {
		if (!selectedPreset) {
			return;
		}

		const preset = smtpProviderPresets[selectedPreset];
		form.setFieldValue('host', preset.host);
		form.setFieldValue('port', preset.port);
		form.setFieldValue('security', preset.security);
	};

	return (
		<form.Root
			form={form}
			schema={smtpUpsertSchema}
		>
			<Drawer.Body>
				<form.Group>
					<div className='rounded-lg border border-dashed p-3 md:p-4'>
						<div className='grid gap-3 md:grid-cols-[1fr_auto] md:items-end'>
							<SelectInput
								label={t('settings.tabs.automations.smtp.presets.label')}
								tooltip={t(
									'settings.tabs.automations.smtp.presets.description',
								)}
								placeholder={t(
									'settings.tabs.automations.smtp.presets.placeholder',
								)}
								value={selectedPreset}
								onChange={(value) =>
									setSelectedPreset(value as SmtpProviderPreset | undefined)
								}
								items={[
									{
										label: t(
											'settings.tabs.automations.smtp.presets.providers.gmail',
										),
										value: 'gmail',
									},
									{
										label: t(
											'settings.tabs.automations.smtp.presets.providers.outlook',
										),
										value: 'outlook',
									},
									{
										label: t(
											'settings.tabs.automations.smtp.presets.providers.mailgun',
										),
										value: 'mailgun',
									},
									{
										label: t(
											'settings.tabs.automations.smtp.presets.providers.sendgrid',
										),
										value: 'sendgrid',
									},
								]}
								allowEmpty
							/>
							<Button
								size='sm'
								variant='secondary'
								onClick={applyPreset}
								disabled={!selectedPreset}
							>
								{t('settings.tabs.automations.smtp.presets.applyAction')}
							</Button>
						</div>
					</div>
					<form.AppField
						name='name'
						children={(field) => (
							<field.TextInput
								label={t('settings.tabs.automations.smtp.form.nameLabel')}
								placeholder={t(
									'settings.tabs.automations.smtp.form.namePlaceholder',
								)}
							/>
						)}
					/>
					<form.AppField
						name='username'
						children={(field) => (
							<field.TextInput
								label={t('settings.tabs.automations.smtp.form.usernameLabel')}
								tooltip={t('settings.tabs.automations.smtp.form.usernameHint')}
								placeholder={t(
									'settings.tabs.automations.smtp.form.usernamePlaceholder',
								)}
							/>
						)}
					/>
					<form.AppField
						name='host'
						children={(field) => (
							<field.TextInput
								label={t('settings.tabs.automations.smtp.form.hostLabel')}
								tooltip={t('settings.tabs.automations.smtp.form.hostHint')}
								placeholder={t(
									'settings.tabs.automations.smtp.form.hostPlaceholder',
								)}
							/>
						)}
					/>
					<form.AppField
						name='fromEmail'
						children={(field) => (
							<field.TextInput
								label={t('settings.tabs.automations.smtp.form.fromEmailLabel')}
								tooltip={t('settings.tabs.automations.smtp.form.fromEmailHint')}
								placeholder={t(
									'settings.tabs.automations.smtp.form.fromEmailPlaceholder',
								)}
							/>
						)}
					/>
					<div className='grid gap-4 md:grid-cols-2'>
						<form.AppField
							name='port'
							children={(field) => (
								<field.NumberInput
									label={t('settings.tabs.automations.smtp.form.portLabel')}
									tooltip={t('settings.tabs.automations.smtp.form.portHint')}
									placeholder='587'
								/>
							)}
						/>
						<form.AppField
							name='security'
							children={(field) => (
								<field.SelectInput
									label={t('settings.tabs.automations.smtp.form.securityLabel')}
									tooltip={t(
										'settings.tabs.automations.smtp.form.securityHint',
									)}
									items={[
										{
											label: t(
												'settings.tabs.automations.smtp.securityModes.starttls',
											),
											value: 'starttls',
										},
										{
											label: t(
												'settings.tabs.automations.smtp.securityModes.sslTls',
											),
											value: 'ssl_tls',
										},
										{
											label: t(
												'settings.tabs.automations.smtp.securityModes.none',
											),
											value: 'none',
										},
									]}
								/>
							)}
						/>
					</div>
					<form.AppField
						name='fromName'
						children={(field) => (
							<field.TextInput
								label={t('settings.tabs.automations.smtp.form.fromNameLabel')}
								placeholder={t(
									'settings.tabs.automations.smtp.form.fromNamePlaceholder',
								)}
							/>
						)}
					/>
					<form.AppField
						name='password'
						children={(field) => (
							<field.TextInput
								type='password'
								label={t('settings.tabs.automations.smtp.form.passwordLabel')}
								tooltip={t(
									mode === 'edit'
										? 'settings.tabs.automations.smtp.form.passwordEditDescription'
										: 'settings.tabs.automations.smtp.form.passwordDescription',
								)}
								placeholder={t(
									mode === 'edit'
										? 'settings.tabs.automations.smtp.form.passwordEditPlaceholder'
										: 'settings.tabs.automations.smtp.form.passwordPlaceholder',
								)}
							/>
						)}
					/>
				</form.Group>
			</Drawer.Body>
			<Drawer.Footer>
				<form.CancelButton
					size='sm'
					onClick={onClose}
				/>
				<form.SubmitButton
					size='sm'
					className='ml-auto'
				>
					{mode === 'edit'
						? t('settings.tabs.automations.smtp.drawer.saveAction')
						: t('settings.tabs.automations.smtp.drawer.createAction')}
				</form.SubmitButton>
			</Drawer.Footer>
		</form.Root>
	);
};
