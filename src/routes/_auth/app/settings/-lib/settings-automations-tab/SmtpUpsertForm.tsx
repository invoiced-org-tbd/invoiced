import { createSmtpConfigMutationOptions } from '@/api/smtp/createSmtpConfig';
import { updateSmtpConfigMutationOptions } from '@/api/smtp/updateSmtpConfig';
import { Button } from '@/components/button/Button';
import { Drawer } from '@/components/drawer/Drawer';
import { runAfterSubmitSuccess } from '@/components/form/utils';
import { SelectInput } from '@/components/select-input/SelectInput';
import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import type { SmtpCreateFormSchema } from './smtpUpsertFormSchemas';
import {
	smtpCreateFormSchema,
	smtpUpdateFormSchema,
	useSmtpUpsertFormDefaultValues,
} from './smtpUpsertFormSchemas';
import type { SmtpProviderPreset } from './utils';
import { useSmtpProviderPresetItems, useSmtpSecurityItems } from './utils';

type UpsertSmtpFormProps = {
	editId?: string;
	isEditing?: boolean;
	onClose: () => void;
};
export const SmtpUpsertForm = ({
	editId,
	isEditing,
	onClose,
}: UpsertSmtpFormProps) => {
	const { t } = useTranslate();

	const { defaultValues, isLoadingEditSmtpConfig } =
		useSmtpUpsertFormDefaultValues({
			editId,
		});

	const { providerPresetItems } = useSmtpProviderPresetItems();
	const { securityItems } = useSmtpSecurityItems();

	const [selectedPreset, setSelectedPreset] = useState<
		SmtpProviderPreset | undefined
	>(providerPresetItems[0].value);

	const { mutateAsync: createSmtpConfig } = useMutation(
		createSmtpConfigMutationOptions(),
	);
	const { mutateAsync: updateSmtpConfig } = useMutation(
		updateSmtpConfigMutationOptions(),
	);

	const schema = isEditing ? smtpUpdateFormSchema : smtpCreateFormSchema;
	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: schema,
		},
		onSubmit: async ({ value }) => {
			if (isEditing) {
				await updateSmtpConfig({
					editId: editId ?? '',
					form: value,
				});
			} else {
				await createSmtpConfig({ form: value as SmtpCreateFormSchema });
			}

			runAfterSubmitSuccess({
				form,
				action: onClose,
			});
		},
	});

	const handleApplyProviderPreset = () => {
		const preset = providerPresetItems.find(
			(item) => item.value === selectedPreset,
		);
		if (!preset) {
			return;
		}

		form.setFieldValue('host', preset.host);
		form.setFieldValue('port', preset.port);
		form.setFieldValue('security', preset.security);
	};

	return (
		<form.Root
			form={form}
			schema={schema}
			isLoading={isLoadingEditSmtpConfig}
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
								onChange={setSelectedPreset}
								items={providerPresetItems}
								allowEmpty={false}
							/>
							<Button
								size='sm'
								variant='secondary'
								onClick={handleApplyProviderPreset}
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
									items={securityItems}
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
									isEditing
										? 'settings.tabs.automations.smtp.form.passwordEditDescription'
										: 'settings.tabs.automations.smtp.form.passwordDescription',
								)}
								placeholder={t(
									isEditing
										? 'settings.tabs.automations.smtp.form.passwordEditPlaceholder'
										: 'settings.tabs.automations.smtp.form.passwordPlaceholder',
								)}
							/>
						)}
					/>
				</form.Group>
			</Drawer.Body>
			<Drawer.Footer>
				<Drawer.Close asChild>
					<form.CancelButton />
				</Drawer.Close>

				<form.SubmitButton />
			</Drawer.Footer>
		</form.Root>
	);
};
