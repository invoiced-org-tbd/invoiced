import { Dialog } from '@/components/dialog/Dialog';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { InvoiceConfigurationPersistSchema } from './invoiceConfigurationFormSchemas';
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
					contractValues={contractValues}
					onSuccess={onSuccess}
				/>
			</Dialog.Content>
		</Dialog.Root>
	);
};
