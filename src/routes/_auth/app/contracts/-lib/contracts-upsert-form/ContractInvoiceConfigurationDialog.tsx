import { Dialog } from '@/components/dialog/Dialog';
import type { InvoiceConfigurationFormSchema } from './invoiceConfigurationFormSchemas';
import { ContractInvoiceConfigurationForm } from './ContractInvoiceConfigurationForm';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

type ContractInvoiceConfigurationDialogProps = {
	open: boolean;
	contractValues: ContractsUpsertFormSchema;
	onClose: () => void;
	onSuccess: (data: InvoiceConfigurationFormSchema) => void;
};

export const ContractInvoiceConfigurationDialog = ({
	open,
	contractValues,
	onClose,
	onSuccess,
}: ContractInvoiceConfigurationDialogProps) => {
	return (
		<Dialog.Root
			open={open}
			onOpenChange={onClose}
		>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>
						Configure Invoice Pattern and Starting Number
					</Dialog.Title>
				</Dialog.Header>

				<ContractInvoiceConfigurationForm
					contractValues={contractValues}
					onSuccess={onSuccess}
				/>
			</Dialog.Content>
		</Dialog.Root>
	);
};
