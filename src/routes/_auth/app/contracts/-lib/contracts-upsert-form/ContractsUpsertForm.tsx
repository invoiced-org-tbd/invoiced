import { createContractMutationOptions } from '@/api/contract/createContract';
import { Button } from '@/components/button/Button';
import { Drawer } from '@/components/drawer/Drawer';
import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import { useFormStepper } from '@/hooks/use-app-form/useFormStepper';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ContractClientForm } from './ContractClientForm';
import { ContractsInvoicePreviewDialog } from './ContractsInvoicePreviewDialog';
import { ContractRoleForm } from './ContractRoleForm';
import {
	contractsUpsertFormSchema,
	useContractsUpsertFormDefaultValues,
} from './contractsUpsertFormSchemas';
import { updateContractMutationOptions } from '@/api/contract/updateContract';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { ContractSummary } from './ContractSummary';
import type { ContractStep } from '../..';
import type { FormStepperStep } from '@/hooks/use-app-form/useFormStepper';

type ContractsUpsertFormProps = {
	editId?: string;
	onClose: () => void;
};

const contractSteps = [
	{ value: 'role', labelKey: 'contracts.tabs.role' },
	{ value: 'client', labelKey: 'contracts.tabs.client' },
] as const satisfies readonly (FormStepperStep<ContractStep> & {
	labelKey: `contracts.tabs.${ContractStep}`;
})[];

export const ContractsUpsertForm = ({
	editId,
	onClose,
}: ContractsUpsertFormProps) => {
	const { t } = useTranslate();
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
				</FormSteps.Root>

				<section className='mt-auto'>
					<form.Subscribe
						selector={(state) => state.values}
						children={(data) => {
							return (
								<ContractSummary
									data={data}
									isLoading={isLoadingEditContract}
								/>
							);
						}}
					/>
				</section>
			</Drawer.Body>

			<Drawer.Footer>
				<form.CancelButton onClick={onClose} />

				<div className='flex items-center gap-2 ml-auto'>
					<form.Subscribe
						selector={(state) => ({
							canSubmit: state.canSubmit,
							values: state.values,
						})}
						children={({ canSubmit, values }) => (
							<>
								<Button
									variant='secondary'
									onClick={() => setIsPreviewOpen(true)}
								>
									{t('contracts.invoicePreview.previewButton')}
								</Button>

								<ContractsInvoicePreviewDialog
									open={isPreviewOpen}
									onOpenChange={setIsPreviewOpen}
									contractData={values}
									canSubmit={canSubmit}
								/>
							</>
						)}
					/>
					<FormSteps.PreviousButton />
					<FormSteps.SubmitButton />
					<FormSteps.NextButton />
				</div>
			</Drawer.Footer>
		</form.Root>
	);
};
