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

	return (
		<form.Root
			form={form}
			isLoading={isLoadingEditContract}
		>
			<form.Group>
				<form.Group>
					<form.AppField
						name='description'
						children={(field) => (
							<field.TextInput label={t('contracts.form.descriptionLabel')} />
						)}
					/>
				</form.Group>

				<form.Group>
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
				</form.Group>

				<form.Group>
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
				</form.Group>

				<ContractAutoSendConfigurationForm
					form={form}
					fields='autoSendConfiguration'
				/>
			</form.Group>

			<Drawer.Footer>
				<form.SubmitButton />
			</Drawer.Footer>
		</form.Root>
	);
};
