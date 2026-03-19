import { createContractMutationOptions } from '@/api/contract/createContract';
import { Drawer } from '@/components/drawer';
import { useAppForm, useFormStepper } from '@/hooks/use-app-form';
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
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { ContractSummary } from './ContractSummary';
import type { ContractStep } from '../..';
import type { FormStepperStep } from '@/hooks/use-app-form';

export type ContractsUpsertFormProps = {
	editId?: string;
	onClose: () => void;
};

const contractSteps = [
	{ value: 'general', labelKey: 'contracts.tabs.general' },
	{ value: 'role', labelKey: 'contracts.tabs.role' },
	{ value: 'client', labelKey: 'contracts.tabs.client' },
	{
		value: 'autoSendConfiguration',
		labelKey: 'contracts.tabs.autoSendConfiguration',
	},
] as const satisfies readonly (FormStepperStep<ContractStep> & {
	labelKey: `contracts.tabs.${ContractStep}`;
})[];

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

	const { FormSteps } = useFormStepper({
		form,
		mode: editId ? 'edit' : 'create',
		steps: contractSteps,
		searchParamKey: 'step',
	});

	return (
		<form.Root
			form={form}
			schema={contractsUpsertFormSchema}
			isLoading={isLoadingEditContract}
		>
			<Drawer.Body>
				<FormSteps.Root>
					<FormSteps.List sticky={true}>
						{contractSteps.map((stepItem) => (
							<FormSteps.Trigger
								key={stepItem.value}
								value={stepItem.value}
							>
								{t(stepItem.labelKey)}
							</FormSteps.Trigger>
						))}
					</FormSteps.List>

					<FormSteps.Content value='general'>
						<ContractGeneralForm
							form={form}
							fields='general'
						/>
					</FormSteps.Content>

					<FormSteps.Content value='role'>
						<ContractRoleForm
							form={form}
							fields='role'
						/>
					</FormSteps.Content>

					<FormSteps.Content value='client'>
						<ContractClientForm
							form={form}
							fields='client'
						/>
					</FormSteps.Content>

					<FormSteps.Content value='autoSendConfiguration'>
						<ContractAutoSendConfigurationForm
							form={form}
							fields='autoSendConfiguration'
						/>
					</FormSteps.Content>
				</FormSteps.Root>

				<form.Subscribe
					selector={(state) => state.values}
					children={(data) => {
						return <ContractSummary data={data} />;
					}}
				/>
			</Drawer.Body>

			<Drawer.Footer>
				<form.CancelButton onClick={onClose} />

				<div className='flex items-center gap-2 ml-auto'>
					<FormSteps.PreviousButton />
					<FormSteps.SubmitButton />
					<FormSteps.NextButton />
				</div>
			</Drawer.Footer>
		</form.Root>
	);
};
