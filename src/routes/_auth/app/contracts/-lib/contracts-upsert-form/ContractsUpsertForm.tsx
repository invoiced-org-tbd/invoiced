import { createContractMutationOptions } from '@/api/contract/createContract';
import { Drawer } from '@/components/drawer';
import { useAppForm } from '@/hooks/use-app-form';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { ContractAutoSendConfigurationForm } from './ContractAutoSendConfigurationForm';
import {
	contractsUpsertFormSchema,
	useContractsUpsertFormDefaultValues,
} from './contractsUpsertFormSchemas';
import { updateContractMutationOptions } from '@/api/contract/updateContract';
import { createFormTabs } from '@/components/form-tabs';
import type { ContractTabs } from '../..';

export type ContractsUpsertFormProps = {
	editId?: string;
	onSuccess: () => void;
};

export const ContractsUpsertForm = ({
	editId,
	onSuccess,
}: ContractsUpsertFormProps) => {
	const { t } = useTranslate();
	const { defaultValues, isLoadingEditContract } =
		useContractsUpsertFormDefaultValues({
			editId,
		});

	const { mutateAsync: createContract } = useMutation(
		createContractMutationOptions(),
	);
	const { mutateAsync: updateContract } = useMutation(
		updateContractMutationOptions(),
	);

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: contractsUpsertFormSchema,
		},
		onSubmit: async ({ value }) => {
			if (editId) {
				await updateContract({ editId, data: value });
			} else {
				await createContract(value);
			}

			onSuccess();
		},
	});

	const FormTabs = createFormTabs<ContractTabs>();

	return (
		<form.Root
			form={form}
			isLoading={isLoadingEditContract}
		>
			<FormTabs.Root searchParamKey='tab'>
				<FormTabs.List>
					<FormTabs.Trigger value='general'>General</FormTabs.Trigger>
					<FormTabs.Trigger value='role'>Role</FormTabs.Trigger>
					<FormTabs.Trigger value='client'>Client</FormTabs.Trigger>
					<FormTabs.Trigger value='autoSendConfiguration'>
						Auto Send Configuration
					</FormTabs.Trigger>
				</FormTabs.List>

				<FormTabs.Content value='general'>
					<form.AppField
						name='general.description'
						children={(field) => (
							<field.TextInput label={t('contracts.form.descriptionLabel')} />
						)}
					/>
				</FormTabs.Content>

				<FormTabs.Content value='role'>
					<form.AppField
						name='role.description'
						children={(field) => (
							<field.TextInput
								label={t('contracts.form.role.descriptionLabel')}
							/>
						)}
					/>
					<form.AppField
						name='role.rate'
						children={(field) => (
							<field.NumberInput
								label={t('contracts.form.role.rateLabel')}
								mode='currency'
							/>
						)}
					/>
				</FormTabs.Content>

				<FormTabs.Content value='client'>
					<form.AppField
						name='client.companyName'
						children={(field) => (
							<field.TextInput
								label={t('contracts.form.client.companyNameLabel')}
							/>
						)}
					/>
					<form.AppField
						name='client.responsibleName'
						children={(field) => (
							<field.TextInput
								label={t('contracts.form.client.responsibleNameLabel')}
							/>
						)}
					/>
					<form.AppField
						name='client.responsibleEmail'
						children={(field) => (
							<field.TextInput
								label={t('contracts.form.client.responsibleEmailLabel')}
							/>
						)}
					/>
				</FormTabs.Content>

				<FormTabs.Content value='autoSendConfiguration'>
					<ContractAutoSendConfigurationForm
						form={form}
						fields='autoSendConfiguration'
					/>
				</FormTabs.Content>
			</FormTabs.Root>

			<Drawer.Footer>
				<form.SubmitButton />
			</Drawer.Footer>
		</form.Root>
	);
};
