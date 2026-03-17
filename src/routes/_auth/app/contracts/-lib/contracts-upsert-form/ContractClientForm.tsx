import { withFieldGroup } from '@/hooks/use-app-form';
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
			</group.Set>
		);
	},
});
