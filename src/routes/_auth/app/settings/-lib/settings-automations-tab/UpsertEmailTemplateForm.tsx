import { Drawer } from '@/components/drawer/Drawer';
import { createEmailTemplateMutationOptions } from '@/api/email-template/createEmailTemplate';
import { emailTemplateUpsertSchema } from '@/api/email-template/emailTemplateUpsertSchema';
import type { EmailTemplateUpsertSchema } from '@/api/email-template/emailTemplateUpsertSchema';
import type { GetEmailTemplatesResponse } from '@/api/email-template/getEmailTemplates';
import { updateEmailTemplateMutationOptions } from '@/api/email-template/updateEmailTemplate';
import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { slugify } from '@/utils/stringUtils';

type UpsertEmailTemplateFormProps = {
	mode: 'create' | 'edit';
	emailTemplate?: GetEmailTemplatesResponse[number];
	onClose: () => void;
	onSuccess: () => void;
};

const toDefaultValues = (
	mode: UpsertEmailTemplateFormProps['mode'],
	emailTemplate?: GetEmailTemplatesResponse[number],
): EmailTemplateUpsertSchema => {
	if (mode === 'edit' && emailTemplate) {
		return {
			name: emailTemplate.name,
			slug: emailTemplate.slug,
			subject: emailTemplate.subject,
			body: emailTemplate.body,
		};
	}

	return {
		name: '',
		slug: '',
		subject: '',
		body: '',
	};
};

export const UpsertEmailTemplateForm = ({
	mode,
	emailTemplate,
	onClose,
	onSuccess,
}: UpsertEmailTemplateFormProps) => {
	const { t } = useTranslate();
	const initialValues = toDefaultValues(mode, emailTemplate);

	const { mutateAsync: createEmailTemplate } = useMutation(
		createEmailTemplateMutationOptions(),
	);
	const { mutateAsync: updateEmailTemplate } = useMutation(
		updateEmailTemplateMutationOptions(),
	);
	const form = useAppForm({
		defaultValues: initialValues,
		validators: {
			onChange: emailTemplateUpsertSchema,
		},
		onSubmit: async ({ value }) => {
			if (mode === 'edit' && emailTemplate) {
				await updateEmailTemplate({
					id: emailTemplate.id,
					...value,
				});
			} else {
				await createEmailTemplate(value);
			}
			onSuccess();
		},
	});

	return (
		<form.Root
			form={form}
			schema={emailTemplateUpsertSchema}
		>
			<Drawer.Body>
				<form.Group>
					<form.AppField
						name='name'
						children={(field) => (
							<field.TextInput
								label={t(
									'settings.tabs.automations.emailTemplates.form.nameLabel',
								)}
								placeholder={t(
									'settings.tabs.automations.emailTemplates.form.namePlaceholder',
								)}
								onChange={(value) => {
									const nextName = value ?? '';
									field.handleChange(nextName);
									const slugMeta = form.getFieldMeta('slug');

									if (slugMeta?.isDirty) {
										return;
									}

									form.setFieldValue('slug', slugify(nextName), {
										dontRunListeners: true,
										dontUpdateMeta: true,
									});
								}}
							/>
						)}
					/>
					<form.AppField
						name='slug'
						children={(field) => (
							<field.TextInput
								label={t(
									'settings.tabs.automations.emailTemplates.form.slugLabel',
								)}
								placeholder={t(
									'settings.tabs.automations.emailTemplates.form.slugPlaceholder',
								)}
							/>
						)}
					/>
					<form.AppField
						name='subject'
						children={(field) => (
							<field.TextInput
								label={t(
									'settings.tabs.automations.emailTemplates.form.subjectLabel',
								)}
								placeholder={t(
									'settings.tabs.automations.emailTemplates.form.subjectPlaceholder',
								)}
							/>
						)}
					/>
					<form.AppField
						name='body'
						children={(field) => (
							<field.TextareaInput
								label={t(
									'settings.tabs.automations.emailTemplates.form.bodyLabel',
								)}
								placeholder={t(
									'settings.tabs.automations.emailTemplates.form.bodyPlaceholder',
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
						? t('settings.tabs.automations.emailTemplates.drawer.saveAction')
						: t('settings.tabs.automations.emailTemplates.drawer.createAction')}
				</form.SubmitButton>
			</Drawer.Footer>
		</form.Root>
	);
};
