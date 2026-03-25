import { withFieldGroup } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { CreateCompanyFormSchema } from './createCompanyFormSchema';

export const CreateCompanyGeneralForm = withFieldGroup({
	defaultValues: {} as CreateCompanyFormSchema['general'],
	render: ({ group }) => {
		const { t } = useTranslate();

		return (
			<group.Group>
				<group.Separator>
					{t('createCompany.form.companySectionTitle')}
				</group.Separator>
				<group.AppField
					name='name'
					children={(field) => (
						<field.TextInput
							label={t('createCompany.form.nameLabel')}
							placeholder={t('createCompany.form.namePlaceholder')}
							description={t('createCompany.form.nameDescription')}
						/>
					)}
				/>
				<group.AppField
					name='email'
					children={(field) => (
						<field.TextInput
							label={t('common.email')}
							placeholder={t('createCompany.form.emailPlaceholder')}
						/>
					)}
				/>
			</group.Group>
		);
	},
});
