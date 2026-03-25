import { AddressForm } from '@/components/address-form/AddressForm';
import { withFieldGroup } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

export const ContractClientForm = withFieldGroup({
	defaultValues: {} as ContractsUpsertFormSchema['client'],
	render: ({ group }) => {
		const { t } = useTranslate();

		return (
			<group.Set>
				<group.AppField
					name='companyName'
					children={(field) => (
						<field.TextInput
							label={t('contracts.form.client.companyNameLabel')}
						/>
					)}
				/>
				<group.AppField
					name='responsibleName'
					children={(field) => (
						<field.TextInput
							label={t('contracts.form.client.responsibleNameLabel')}
						/>
					)}
				/>
				<group.AppField
					name='responsibleEmail'
					children={(field) => (
						<field.TextInput
							label={t('contracts.form.client.responsibleEmailLabel')}
						/>
					)}
				/>
				<AddressForm
					form={group}
					fields='address'
					labels={{
						sectionTitle: t('contracts.form.client.address.sectionTitle'),
						street1Label: t('contracts.form.client.address.street1Label'),
						street2Label: t('contracts.form.client.address.street2Label'),
						numberLabel: t('contracts.form.client.address.numberLabel'),
						postalCodeLabel: t('contracts.form.client.address.postalCodeLabel'),
						cityLabel: t('contracts.form.client.address.cityLabel'),
						stateLabel: t('contracts.form.client.address.stateLabel'),
						countryLabel: t('contracts.form.client.address.countryLabel'),
					}}
				/>
			</group.Set>
		);
	},
});
