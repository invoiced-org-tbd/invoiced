import { createContractMutationOptions } from '@/api/contract/createContract';
import { updateContractMutationOptions } from '@/api/contract/updateContract';
import { getInvoiceConfigurationQueryOptions } from '@/api/invoice-configuration/getInvoiceConfiguration';
import { Button } from '@/components/button/Button';
import { Drawer } from '@/components/drawer/Drawer';
import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import type { FormStepperStep } from '@/hooks/use-app-form/useFormStepper';
import { useFormStepper } from '@/hooks/use-app-form/useFormStepper';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import type { ContractsSearchSchema, ContractStep } from '../..';
import { ContractAutoSendForm } from './ContractAutoSendForm';
import { ContractClientForm } from './ContractClientForm';
import { ContractInvoiceConfigurationDialog } from './ContractInvoiceConfigurationDialog';
import { ContractInvoiceRecurrenceForm } from './ContractInvoiceRecurrenceForm';
import { ContractRoleForm } from './ContractRoleForm';
import { ContractsInvoicePreviewDialog } from './ContractsInvoicePreviewDialog';
import {
	contractsUpsertFormSchema,
	useContractsUpsertFormDefaultValues,
} from './contractsUpsertFormSchemas';
import type { InvoiceConfigurationPersistSchema } from './invoiceConfigurationFormSchemas';

const contractSteps = [
	{ value: 'role', labelKey: 'contracts.tabs.role' },
	{ value: 'client', labelKey: 'contracts.tabs.client' },
	{ value: 'invoiceRecurrence', labelKey: 'contracts.tabs.invoiceRecurrence' },
	{ value: 'autoSend', labelKey: 'contracts.tabs.autoSend' },
] as const satisfies readonly (FormStepperStep<ContractStep> & {
	labelKey: `contracts.tabs.${ContractStep}`;
})[];

type ContractsUpsertFormProps = {
	selectedContractId: string;
	isEditing?: boolean;
	onClose: (redirectId?: string) => void;
};
export const ContractsUpsertForm = ({
	selectedContractId,
	isEditing,
	onClose,
}: ContractsUpsertFormProps) => {
	const { t } = useTranslate();
	const queryClient = useQueryClient();

	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [isInvoiceConfigurationOpen, setIsInvoiceConfigurationOpen] =
		useState(false);

	const { defaultValues, isLoadingEditContract } =
		useContractsUpsertFormDefaultValues({ selectedContractId, isEditing });

	const { mutateAsync: createContract } = useMutation(
		createContractMutationOptions(),
	);
	const { mutateAsync: updateContract } = useMutation(
		updateContractMutationOptions(),
	);

	const form = useAppForm({
		defaultValues,
		onSubmitMeta: {
			value: undefined as InvoiceConfigurationPersistSchema | undefined,
		},
		validators: {
			onChange: contractsUpsertFormSchema,
		},
		onSubmit: async ({ value, meta }) => {
			const invoiceConfiguration = await queryClient.fetchQuery(
				getInvoiceConfigurationQueryOptions(),
			);
			if (!invoiceConfiguration && !meta.value) {
				setIsInvoiceConfigurationOpen(true);
				return;
			}

			let createdContractId: string | undefined;
			if (isEditing) {
				await updateContract({
					editId: selectedContractId,
					form: value,
					invoiceConfiguration: meta.value,
				});
			} else {
				const { contractId } = await createContract({
					form: value,
					invoiceConfiguration: meta.value,
				});

				createdContractId = contractId;
			}

			onClose(createdContractId);
		},
	});

	const { FormSteps } = useFormStepper({
		form,
		mode: isEditing ? 'edit' : 'create',
		steps: contractSteps,
		searchParamKey: 'step',
	});

	return (
		<form.Root
			form={form}
			schema={contractsUpsertFormSchema}
			isLoading={isLoadingEditContract}
			safeSearchParamKeys={['step'] satisfies (keyof ContractsSearchSchema)[]}
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
			</Drawer.Body>

			<Drawer.Footer>
				<form.CancelButton
					size='sm'
					onClick={() => onClose()}
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
									isIncomplete={!canSubmit}
								/>
							</>
						)}
					/>
					<FormSteps.PreviousButton />
					<FormSteps.SubmitButton />
					<FormSteps.NextButton />
				</div>
			</Drawer.Footer>

			<form.Subscribe
				selector={(state) => state.values}
				children={(values) => (
					<ContractInvoiceConfigurationDialog
						open={isInvoiceConfigurationOpen}
						contractValues={values}
						onClose={() => setIsInvoiceConfigurationOpen(false)}
						onSuccess={(data) => {
							form.handleSubmit({
								value: data,
							});
							setIsInvoiceConfigurationOpen(false);
						}}
					/>
				)}
			/>
		</form.Root>
	);
};
