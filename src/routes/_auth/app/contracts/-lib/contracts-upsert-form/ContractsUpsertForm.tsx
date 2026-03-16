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
	const defaultValues = useContractsUpsertFormDefaultValues({ editId });

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
				await updateContract({ id: editId, data: value });
			} else {
				await createContract(value);
			}

			onSuccess();
		},
	});

	return (
		<form.Root form={form}>
			<form.Group>
				<form.Group>
					<form.AppField
						name='description'
						children={(field) => (
							<field.TextInput label={t('contracts.description')} />
						)}
					/>
				</form.Group>

				<form.Group>
					<form.AppField
						name='role.description'
						children={(field) => (
							<field.TextInput label={t('contracts.role.description')} />
						)}
					/>
					<form.AppField
						name='role.rate'
						children={(field) => (
							<field.NumberInput
								label={t('contracts.role.rate')}
								mode='currency'
							/>
						)}
					/>
					<form.AppField
						name='role.email'
						children={(field) => (
							<field.TextInput label={t('contracts.role.email')} />
						)}
					/>
				</form.Group>

				<form.Group>
					<form.AppField
						name='client.companyName'
						children={(field) => (
							<field.TextInput label={t('contracts.client.companyName')} />
						)}
					/>
					<form.AppField
						name='client.responsibleName'
						children={(field) => (
							<field.TextInput label={t('contracts.client.responsibleName')} />
						)}
					/>
					<form.AppField
						name='client.responsibleEmail'
						children={(field) => (
							<field.TextInput label={t('contracts.client.responsibleEmail')} />
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
