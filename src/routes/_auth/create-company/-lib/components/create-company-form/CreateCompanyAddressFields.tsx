import { withFieldGroup } from '@/hooks/use-app-form';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { CreateCompanyFormSchema } from './createCompanyFormSchema';

export const CreateCompanyAddressForm = withFieldGroup({
	defaultValues: {} as CreateCompanyFormSchema['address'],
	render: ({ group }) => {
		const { t } = useTranslate();

		return (
			<group.Group>
				<group.Separator>
					{t('createCompany.form.addressSectionTitle')}
				</group.Separator>
				<group.AppField
					name='street1'
					children={(field) => (
						<field.TextInput
							label={t('createCompany.form.street1Label')}
							placeholder={t('createCompany.form.street1Placeholder')}
						/>
					)}
				/>
				<group.AppField
					name='street2'
					children={(field) => (
						<field.TextInput
							label={t('createCompany.form.street2Label')}
							placeholder={t('createCompany.form.street2Placeholder')}
						/>
					)}
				/>

				<div className='flex gap-4'>
					<group.AppField
						name='number'
						children={(field) => (
							<field.TextInput
								label={t('createCompany.form.numberLabel')}
								placeholder={t('createCompany.form.numberPlaceholder')}
							/>
						)}
					/>
					<group.AppField
						name='postalCode'
						children={(field) => (
							<field.TextInput
								label={t('createCompany.form.postalCodeLabel')}
								placeholder={t('createCompany.form.postalCodePlaceholder')}
							/>
						)}
					/>
				</div>
				<div className='flex gap-4'>
					<group.AppField
						name='city'
						children={(field) => (
							<field.TextInput
								label={t('createCompany.form.cityLabel')}
								placeholder={t('createCompany.form.cityPlaceholder')}
							/>
						)}
					/>
					<group.AppField
						name='state'
						children={(field) => (
							<field.TextInput
								label={t('createCompany.form.stateLabel')}
								placeholder={t('createCompany.form.statePlaceholder')}
							/>
						)}
					/>
					<group.AppField
						name='country'
						children={(field) => (
							<field.TextInput
								label={t('createCompany.form.countryLabel')}
								placeholder={t('createCompany.form.countryPlaceholder')}
							/>
						)}
					/>
				</div>
			</group.Group>
		);
	},
});
