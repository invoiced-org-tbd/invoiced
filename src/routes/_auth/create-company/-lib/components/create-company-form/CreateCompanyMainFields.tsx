import { withFieldGroup } from '@/hooks/use-app-form';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { CreateCompanyFormSchema } from './createCompanyFormSchema';

type CreateCompanyMainFormSchema = Pick<
	CreateCompanyFormSchema,
	'name' | 'email'
>;

const createCompanyMainFormDefaults: CreateCompanyMainFormSchema = {
	name: '',
	email: '',
};

export const CreateCompanyMainFields = withFieldGroup({
	defaultValues: createCompanyMainFormDefaults,
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
