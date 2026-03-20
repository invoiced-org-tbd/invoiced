import { withFieldGroup } from '@/hooks/use-app-form';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

export const ContractClientAddressForm = withFieldGroup({
	defaultValues: {} as ContractsUpsertFormSchema['client']['address'],
	render: ({ group }) => {
		const { t } = useTranslate();

		return (
			<group.Group>
				<group.Separator>
					{t('contracts.form.client.address.sectionTitle')}
				</group.Separator>
				<group.AppField
					name='street1'
					children={(field) => (
						<field.TextInput
							label={t('contracts.form.client.address.street1Label')}
						/>
					)}
				/>
				<group.AppField
					name='street2'
					children={(field) => (
						<field.TextInput
							label={t('contracts.form.client.address.street2Label')}
						/>
					)}
				/>
				<div className='flex gap-4'>
					<group.AppField
						name='number'
						children={(field) => (
							<field.TextInput
								label={t('contracts.form.client.address.numberLabel')}
							/>
						)}
					/>
					<group.AppField
						name='postalCode'
						children={(field) => (
							<field.TextInput
								label={t('contracts.form.client.address.postalCodeLabel')}
							/>
						)}
					/>
				</div>
				<div className='flex gap-4'>
					<group.AppField
						name='city'
						children={(field) => (
							<field.TextInput
								label={t('contracts.form.client.address.cityLabel')}
							/>
						)}
					/>
					<group.AppField
						name='state'
						children={(field) => (
							<field.TextInput
								label={t('contracts.form.client.address.stateLabel')}
							/>
						)}
					/>
					<group.AppField
						name='country'
						children={(field) => (
							<field.TextInput
								label={t('contracts.form.client.address.countryLabel')}
							/>
						)}
					/>
				</div>
			</group.Group>
		);
	},
});
