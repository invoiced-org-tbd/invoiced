import { createContractMutationOptions } from '@/api/contract/createContract';
import { Drawer } from '@/components/drawer';
import { useAppForm } from '@/hooks/use-app-form';
import { useMutation } from '@tanstack/react-query';
import { ContractAutoSendConfigurationForm } from './ContractAutoSendConfigurationForm';
import { ContractClientForm } from './ContractClientForm';
import { ContractGeneralForm } from './ContractGeneralForm';
import { ContractRoleForm } from './ContractRoleForm';
import {
	contractsUpsertFormSchema,
	useContractsUpsertFormDefaultValues,
} from './contractsUpsertFormSchemas';
import { updateContractMutationOptions } from '@/api/contract/updateContract';
import { createFormTabs } from '@/components/form-tabs';
import type { ContractTabs } from '../..';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { ContractSummary } from './ContractSummary';

export type ContractsUpsertFormProps = {
	editId?: string;
	onClose: () => void;
};

export const ContractsUpsertForm = ({
	editId,
	onClose,
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

			onClose();
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
					<FormTabs.Trigger value='general'>
						{t('contracts.tabs.general')}
					</FormTabs.Trigger>
					<FormTabs.Trigger value='role'>
						{t('contracts.tabs.role')}
					</FormTabs.Trigger>
					<FormTabs.Trigger value='client'>
						{t('contracts.tabs.client')}
					</FormTabs.Trigger>
					<FormTabs.Trigger value='autoSendConfiguration'>
						{t('contracts.tabs.autoSendConfiguration')}
					</FormTabs.Trigger>
				</FormTabs.List>

				<FormTabs.Content value='general'>
					<ContractGeneralForm
						form={form}
						fields='general'
					/>
				</FormTabs.Content>

				<FormTabs.Content value='role'>
					<ContractRoleForm
						form={form}
						fields='role'
					/>
				</FormTabs.Content>

				<FormTabs.Content value='client'>
					<ContractClientForm
						form={form}
						fields='client'
					/>
				</FormTabs.Content>

				<FormTabs.Content value='autoSendConfiguration'>
					<ContractAutoSendConfigurationForm
						form={form}
						fields='autoSendConfiguration'
					/>
				</FormTabs.Content>
			</FormTabs.Root>

			<form.Subscribe
				selector={(state) => state.values}
				children={(data) => {
					return <ContractSummary data={data} />;
				}}
			/>

			<Drawer.Footer className='justify-end'>
				<form.CancelButton onClick={onClose} />
				<form.SubmitButton />
			</Drawer.Footer>
		</form.Root>
	);
};
