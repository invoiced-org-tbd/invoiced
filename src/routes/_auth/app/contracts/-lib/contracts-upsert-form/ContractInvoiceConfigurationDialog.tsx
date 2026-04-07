import { Dialog } from '@/components/dialog/Dialog';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { setDay } from 'date-fns';
import type { InvoiceConfigurationPersistSchema } from './invoiceConfigurationFormSchemas';
import { useInvoiceConfigurationFormDefaultValues } from './invoiceConfigurationFormSchemas';
import { ContractInvoiceConfigurationForm } from './ContractInvoiceConfigurationForm';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

type ContractInvoiceConfigurationDialogProps = {
	open: boolean;
	contractValues: ContractsUpsertFormSchema;
	onClose: () => void;
	onSuccess: (data: InvoiceConfigurationPersistSchema) => void;
};

export const ContractInvoiceConfigurationDialog = ({
	open,
	contractValues,
	onClose,
	onSuccess,
}: ContractInvoiceConfigurationDialogProps) => {
	const { t } = useTranslate();
	const { defaultValues } = useInvoiceConfigurationFormDefaultValues();
	const dayOfMonth = contractValues.invoiceRecurrence.items[0].dayOfMonth;
	const previewReferenceDate = dayOfMonth
		? setDay(new Date(), dayOfMonth)
		: new Date();

	return (
		<Dialog.Root
			open={open}
			onOpenChange={onClose}
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

				<ContractInvoiceConfigurationForm
					defaultValues={defaultValues}
					previewCompanyName={contractValues.client.companyName}
					previewReferenceDate={previewReferenceDate}
					onSuccess={onSuccess}
					submitLabel={t('contracts.invoiceConfigurationSetup.finishSetup')}
				/>
			</Dialog.Content>
		</Dialog.Root>
	);
};
