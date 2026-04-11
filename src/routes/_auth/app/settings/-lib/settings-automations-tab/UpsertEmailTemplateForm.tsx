import { Drawer } from '@/components/drawer/Drawer';
import { createEmailTemplateMutationOptions } from '@/api/email-template/createEmailTemplate';
import { updateEmailTemplateMutationOptions } from '@/api/email-template/updateEmailTemplate';
import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { slugify } from '@/utils/stringUtils';
import {
	emailTemplateUpsertFormSchema,
	useEmailTemplateUpsertFormDefaultValues,
} from './emailTemplateUpsertFormSchema';
import { runAfterSubmitSuccess } from '@/components/form/utils';
import { duplicateEmailTemplateMutationOptions } from '@/api/email-template/duplicateEmailTemplate';

type UpsertEmailTemplateFormProps = {
	editId?: string;
	isEditing?: boolean;
	isDuplicating?: boolean;
	onClose: () => void;
};
export const UpsertEmailTemplateForm = ({
	editId,
	isEditing,
	isDuplicating,
	onClose,
}: UpsertEmailTemplateFormProps) => {
	const { t } = useTranslate();

	const { defaultValues, isLoadingEditEmailTemplate } =
		useEmailTemplateUpsertFormDefaultValues({
			editId,
			isDuplicating,
		});

	const { mutateAsync: createEmailTemplate } = useMutation(
		createEmailTemplateMutationOptions(),
	);
	const { mutateAsync: updateEmailTemplate } = useMutation(
		updateEmailTemplateMutationOptions(),
	);

	const { mutateAsync: duplicateEmailTemplate } = useMutation(
		duplicateEmailTemplateMutationOptions(),
	);

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: emailTemplateUpsertFormSchema,
		},
		onSubmit: async ({ value }) => {
			if (isEditing) {
				await updateEmailTemplate({
					editId: editId ?? '',
					form: value,
				});
			} else if (isDuplicating) {
				await duplicateEmailTemplate({ editId: editId ?? '' });
			} else {
				await createEmailTemplate({ form: value });
			}

			runAfterSubmitSuccess({
				form,
				action: onClose,
			});
		},
	});

	const handleNameChange = (value: string | undefined) => {
		const slugMeta = form.getFieldMeta('slug');
		if (slugMeta?.isDirty) {
			return;
		}

		let newValue = '';
		if (value) {
			newValue = slugify(value);
		}

		form.setFieldValue('slug', newValue, {
			dontUpdateMeta: true,
		});
	};

	return (
		<form.Root
			form={form}
			schema={emailTemplateUpsertFormSchema}
			isLoading={isLoadingEditEmailTemplate}
		>
			<Drawer.Body>
				<form.Group>
					<form.AppField
						name='name'
						listeners={{
							onChange: ({ value }) => handleNameChange(value),
						}}
						children={(field) => (
							<field.TextInput
								label={t(
									'settings.tabs.automations.emailTemplates.form.nameLabel',
								)}
								placeholder={t(
									'settings.tabs.automations.emailTemplates.form.namePlaceholder',
								)}
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
							<field.RichTextField
								label={t(
									'settings.tabs.automations.emailTemplates.form.bodyLabel',
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
