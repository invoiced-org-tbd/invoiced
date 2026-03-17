import { withFieldGroup } from '@/hooks/use-app-form';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

export const ContractGeneralForm = withFieldGroup({
	defaultValues: {} as ContractsUpsertFormSchema['general'],
	render: ({ group }) => {
		const { t } = useTranslate();

		return (
			<group.Set>
				<group.AppField
					name='description'
					children={(field) => (
						<field.TextInput label={t('contracts.form.descriptionLabel')} />
					)}
				/>
			</group.Set>
		);
	},
});
