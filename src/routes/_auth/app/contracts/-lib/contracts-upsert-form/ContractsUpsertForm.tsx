import { createContractMutationOptions } from '@/api/contract/createContract';
import { updateContractMutationOptions } from '@/api/contract/updateContract';
import { Button } from '@/components/button/Button';
import { Drawer } from '@/components/drawer/Drawer';
import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import type { FormStepperStep } from '@/hooks/use-app-form/useFormStepper';
import { useFormStepper } from '@/hooks/use-app-form/useFormStepper';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import type { ContractStep } from '../..';
import { ContractAutoSendForm } from './ContractAutoSendForm';
import { ContractClientForm } from './ContractClientForm';
import { ContractInvoiceRecurrenceForm } from './ContractInvoiceRecurrenceForm';
import { ContractRoleForm } from './ContractRoleForm';
import { ContractsInvoicePreviewDialog } from './ContractsInvoicePreviewDialog';
import { ContractSummary } from './ContractSummary';
import {
	contractsUpsertFormSchema,
	useContractsUpsertFormDefaultValues,
} from './contractsUpsertFormSchemas';

type ContractsUpsertFormProps = {
	editId?: string;
	onClose: () => void;
};

const contractSteps = [
	{ value: 'role', labelKey: 'contracts.tabs.role' },
	{ value: 'client', labelKey: 'contracts.tabs.client' },
	{ value: 'invoiceRecurrence', labelKey: 'contracts.tabs.invoiceRecurrence' },
	{ value: 'autoSend', labelKey: 'contracts.tabs.autoSend' },
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
			// Zod `preprocess` on autoSend id fields widens Standard Schema input typing vs form values.
			// @ts-expect-error — runtime validation matches ContractsUpsertFormSchema
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

					<FormSteps.Content value='invoiceRecurrence'>
						<form.Subscribe
							selector={(state) => ({
								rate: state.values.role.rate,
							})}
							children={({ rate }) => (
								<ContractInvoiceRecurrenceForm
									form={form}
									fields='invoiceRecurrence'
									rate={rate}
								/>
							)}
						/>
					</FormSteps.Content>

					<FormSteps.Content value='autoSend'>
						<ContractAutoSendForm
							form={form}
							fields='autoSend'
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
				<form.CancelButton
					size='sm'
					onClick={onClose}
				/>

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
									size='sm'
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
