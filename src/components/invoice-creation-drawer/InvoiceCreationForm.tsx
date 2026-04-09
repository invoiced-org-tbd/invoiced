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
import { getRouteApi } from '@tanstack/react-router';

const invoiceRouteApi = getRouteApi('/_auth/app/invoices/');

type InvoiceCreationFormProps = {
	contractData: GetContractsResponse[number];
};
export const InvoiceCreationForm = ({
	contractData,
}: InvoiceCreationFormProps) => {
	const { t } = useTranslate();
	const navigate = invoiceRouteApi.useNavigate();
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
			const invoice = await createInvoice({
				form: data.value,
				contractId: contractData.id,
			});

			navigate({
				to: '.',
				search: {
					selectedInvoiceId: invoice.id,
				},
			});
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
				<Drawer.Close asChild>
					<form.CancelButton />
				</Drawer.Close>

				<form.SubmitButton />
			</Drawer.Footer>
		</form.Root>
	);
};
