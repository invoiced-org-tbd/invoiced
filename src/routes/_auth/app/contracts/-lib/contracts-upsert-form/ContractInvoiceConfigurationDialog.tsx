import { Dialog } from '@/components/dialog/Dialog';
import { InvoiceConfigurationForm } from '@/components/invoice-configuration-form/InvoiceConfigurationForm';
import type { InvoiceConfigurationPersistSchema } from '@/components/invoice-configuration-form/invoiceConfigurationFormSchemas';
import { invoiceConfigurationFormDefaultValues } from '@/components/invoice-configuration-form/invoiceConfigurationFormSchemas';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { setDate } from 'date-fns';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

type ContractInvoiceConfigurationDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	contractValues: ContractsUpsertFormSchema;
	onSubmit: (data: InvoiceConfigurationPersistSchema) => void;
};

export const ContractInvoiceConfigurationDialog = ({
	open,
	onOpenChange,
	contractValues,
	onSubmit,
}: ContractInvoiceConfigurationDialogProps) => {
	const { t } = useTranslate();
	const defaultValues = invoiceConfigurationFormDefaultValues;
	const dayOfMonth = contractValues.invoiceRecurrence.items[0].dayOfMonth;
	const previewReferenceDate = dayOfMonth
		? setDate(new Date(), dayOfMonth)
		: new Date();

	const handleSuccess = (data: InvoiceConfigurationPersistSchema) => {
		onSubmit(data);
		onOpenChange(false);
	};

	return (
		<Dialog.Root
			open={open}
			onOpenChange={onOpenChange}
		>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>
						{t('contracts.invoiceConfigurationSetup.title')}
					</Dialog.Title>
					<Dialog.Description asChild>
						<div className='text-muted-foreground space-y-2 text-sm leading-relaxed'>
							<p>{t('contracts.invoiceConfigurationSetup.introLead')}</p>
							<p>{t('contracts.invoiceConfigurationSetup.introExisting')}</p>
						</div>
					</Dialog.Description>
				</Dialog.Header>

				<InvoiceConfigurationForm
					defaultValues={defaultValues}
					previewCompanyName={contractValues.client.companyName}
					previewReferenceDate={previewReferenceDate}
					onSuccess={handleSuccess}
					submitLabel={t('contracts.invoiceConfigurationSetup.finishSetup')}
				/>
			</Dialog.Content>
		</Dialog.Root>
	);
};
