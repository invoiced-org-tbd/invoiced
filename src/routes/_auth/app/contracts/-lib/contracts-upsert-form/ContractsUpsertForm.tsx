import { createContractMutationOptions } from '@/api/contract/createContract';
import { Drawer } from '@/components/drawer';
import { useAppForm } from '@/hooks/use-app-form';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import {
	contractsUpsertFormSchema,
	useContractsUpsertFormDefaultValues,
} from './contractsUpsertFormSchemas';
import { ContractAutoSendConfigurationForm } from './ContractAutoSendConfigurationForm';

const contractsRouteApi = getRouteApi('/_auth/app/contracts/');

export const ContractsUpsertForm = () => {
	const { t } = useTranslate();
	const navigate = contractsRouteApi.useNavigate();
	const defaultValues = useContractsUpsertFormDefaultValues();

	const { mutateAsync: createContract } = useMutation(
		createContractMutationOptions(),
	);

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: contractsUpsertFormSchema,
		},
		onSubmit: async ({ value }) => {
			await createContract(value);

			navigate({
				search: (prev) => ({
					...prev,
					isCreating: undefined,
				}),
			});
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
