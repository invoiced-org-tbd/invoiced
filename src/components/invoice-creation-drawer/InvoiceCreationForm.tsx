import type { GetContractsResponse } from '@/api/contract/getContracts';
import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import {
	invoiceCreationFormSchema,
	useInvoiceCreationFormDefaultValues,
} from './invoiceCreationFormSchemas';
import { createInvoiceMutationOptions } from '@/api/invoice/createInvoice';
import { useMutation } from '@tanstack/react-query';
import { Drawer } from '../drawer/Drawer';

type InvoiceCreationFormProps = {
	contractData: GetContractsResponse[number];
	onClose: () => void;
};
export const InvoiceCreationForm = ({
	contractData,
	onClose,
}: InvoiceCreationFormProps) => {
	const { t } = useTranslate();
	const { defaultValues } = useInvoiceCreationFormDefaultValues({
		contractData,
	});

	const { mutateAsync: createInvoice } = useMutation(
		createInvoiceMutationOptions(),
	);

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: invoiceCreationFormSchema,
		},
		onSubmit: async (data) => {
			await createInvoice({
				form: data.value,
				contractId: contractData.id,
			});

			onClose();
		},
	});

	return (
		<form.Root
			form={form}
			schema={invoiceCreationFormSchema}
		>
			<form.AppField
				name='recurrenceId'
				children={(field) => (
					<field.SelectInput
						label={t('invoices.creation.form.recurrenceLabel')}
						items={contractData.invoiceRecurrence.items.map((item) => ({
							value: item.id,
							label: item.dayOfMonth.toString(),
						}))}
					/>
				)}
			/>

			<Drawer.Footer>
				<form.CancelButton onClick={onClose} />
				<form.SubmitButton />
			</Drawer.Footer>
		</form.Root>
	);
};
