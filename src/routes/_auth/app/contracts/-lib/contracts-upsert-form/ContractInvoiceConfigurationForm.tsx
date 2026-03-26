import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import { Dialog } from '@/components/dialog/Dialog';
import type { InvoiceConfigurationFormSchema } from './invoiceConfigurationFormSchemas';
import {
	invoiceConfigurationFormSchema,
	useInvoiceConfigurationFormDefaultValues,
} from './invoiceConfigurationFormSchemas';
import { useStore } from '@tanstack/react-form';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

type ContractInvoiceConfigurationFormProps = {
	contractValues: ContractsUpsertFormSchema;
	onSuccess: (data: InvoiceConfigurationFormSchema) => void;
};

export const ContractInvoiceConfigurationForm = ({
	contractValues,
	onSuccess,
}: ContractInvoiceConfigurationFormProps) => {
	const { defaultValues } = useInvoiceConfigurationFormDefaultValues();

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: invoiceConfigurationFormSchema,
		},
		onSubmit: ({ value }) => {
			onSuccess(value);
		},
	});

	const values = useStore(form.store, (state) => state.values);

	let sampleFormat = '';
	if (values.prefix) {
		sampleFormat += values.prefix;
	}
	if (values.withYear) {
		sampleFormat += new Date().getFullYear();
	}
	if (values.withMonth) {
		sampleFormat += new Date().getMonth() + 1;
	}
	if (values.withDay) {
		sampleFormat += contractValues.invoiceRecurrence.items[0].dayOfMonth;
	}
	if (values.withCompanyName) {
		sampleFormat += contractValues.client.companyName;
	}
	if (values.suffix) {
		sampleFormat += values.suffix;
	}

	return (
		<form.Root
			form={form}
			schema={invoiceConfigurationFormSchema}
			isLoading={false}
		>
			<Dialog.Body>
				<section>
					<p>
						This is your first contract. You can configure the invoice number
						format and the starting number.
					</p>
					<p>
						If you have already created invoices out of the app, you should
						input the last invoice number and the pattern you have been using.
					</p>
				</section>

				<form.Group>
					<form.AppField
						name='prefix'
						children={(field) => <field.TextInput label='Prefix' />}
					/>
					<form.AppField
						name='suffix'
						children={(field) => <field.TextInput label='Suffix' />}
					/>

					<form.Group>
						<form.AppField
							name='withYear'
							children={(field) => <field.Checkbox label='With Year' />}
						/>
						<form.AppField
							name='withMonth'
							children={(field) => <field.Checkbox label='With Month' />}
						/>
						<form.AppField
							name='withDay'
							children={(field) => <field.Checkbox label='With Day' />}
						/>
						<form.AppField
							name='withCompanyName'
							children={(field) => <field.Checkbox label='With Company Name' />}
						/>
					</form.Group>

					<span>format will look like this:</span>

					<form.AppField
						name='lastInvoiceNumber'
						children={(field) => (
							<field.NumberInput label='Last Invoice Number' />
						)}
					/>
				</form.Group>
			</Dialog.Body>

			<Dialog.Footer>
				<form.CancelButton />
				<form.SubmitButton> Finish Setup </form.SubmitButton>
			</Dialog.Footer>
		</form.Root>
	);
};
