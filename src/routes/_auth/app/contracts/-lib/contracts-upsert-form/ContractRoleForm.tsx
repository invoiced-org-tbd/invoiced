import { withFieldGroup } from '@/hooks/use-app-form';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

export const ContractRoleForm = withFieldGroup({
	defaultValues: {} as ContractsUpsertFormSchema['role'],
	render: ({ group }) => {
		const { t } = useTranslate();

		return (
			<group.Set>
				<group.AppField
					name='description'
					children={(field) => (
						<field.TextInput label={t('contracts.form.role.descriptionLabel')} />
					)}
				/>
				<group.AppField
					name='rate'
					children={(field) => (
						<field.NumberInput
							label={t('contracts.form.role.rateLabel')}
							mode='currency'
						/>
					)}
				/>
			</group.Set>
		);
	},
});
