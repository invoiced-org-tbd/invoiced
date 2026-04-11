import { Dialog } from '@/components/dialog/Dialog';
import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import { cn } from '@/utils/classNamesUtils';
import z from 'zod';
import type { InvoiceConfigurationPersistSchema } from './invoiceConfigurationFormSchemas';
import type { InvoiceConfigurationFormSchema } from './invoiceConfigurationFormSchemas';
import { invoiceConfigurationFormSchema } from './invoiceConfigurationFormSchemas';
import { InvoiceConfigurationFormFields } from './InvoiceConfigurationFormFields';

const wrappedInvoiceConfigurationFormSchema = z.object({
	invoiceConfiguration: invoiceConfigurationFormSchema,
});

export type InvoiceConfigurationFormProps = {
	defaultValues: InvoiceConfigurationFormSchema;
	previewCompanyName: string;
	previewReferenceDate: Date;
	onSuccess: (data: InvoiceConfigurationPersistSchema) => void | Promise<void>;
	submitLabel: string;
};

export const InvoiceConfigurationForm = ({
	defaultValues,
	previewCompanyName,
	previewReferenceDate,
	onSuccess,
	submitLabel,
}: InvoiceConfigurationFormProps) => {
	const form = useAppForm({
		defaultValues: { invoiceConfiguration: defaultValues },
		validators: {
			onChange: wrappedInvoiceConfigurationFormSchema,
		},
		onSubmit: async ({ value }) => {
			const { invoiceNumberingMode, ...rest } = value.invoiceConfiguration;
			await onSuccess({
				...rest,
				lastInvoiceNumber:
					invoiceNumberingMode === 'new' ? 0 : rest.lastInvoiceNumber,
			});
		},
	});

	return (
		<form.Root
			form={form}
			schema={wrappedInvoiceConfigurationFormSchema}
			isLoading={false}
		>
			<Dialog.Body className={cn('gap-6')}>
				<InvoiceConfigurationFormFields
					form={form}
					fields='invoiceConfiguration'
					previewCompanyName={previewCompanyName}
					previewReferenceDate={previewReferenceDate}
				/>
			</Dialog.Body>

			<Dialog.Footer>
				<Dialog.Close asChild>
					<form.CancelButton />
				</Dialog.Close>

				<form.SubmitButton>{submitLabel}</form.SubmitButton>
			</Dialog.Footer>
		</form.Root>
	);
};
