import { Button } from '@/components/button/Button';
import { Dialog } from '@/components/dialog/Dialog';
import { InvoicePDF } from '@/components/invoice-pdf/InvoicePDF';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';
import { useContractPreviewToInvoicePDFData } from './utils';

type ContractsInvoicePreviewDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	contract: ContractsUpsertFormSchema;
	isIncomplete?: boolean;
};
export const ContractsInvoicePreviewDialog = ({
	open,
	onOpenChange,
	contract,
	isIncomplete = false,
}: ContractsInvoicePreviewDialogProps) => {
	const { t } = useTranslate();
	const { toInvoicePDFData } = useContractPreviewToInvoicePDFData();

	return (
		<Dialog.Root
			open={open}
			onOpenChange={onOpenChange}
		>
			<Dialog.Content size='xl'>
				<Dialog.Header>
					<Dialog.Title>{t('contracts.invoicePreview.title')}</Dialog.Title>
				</Dialog.Header>

				<Dialog.Body>
					<InvoicePDF
						model='base-v0'
						data={toInvoicePDFData(contract)}
					/>
				</Dialog.Body>

				<Dialog.Footer className='justify-between'>
					<div className='text-xs text-muted-foreground'>
						<p>{t('contracts.invoicePreview.description')}</p>

						{isIncomplete && (
							<p className='text-warning'>
								{t('contracts.invoicePreview.incompleteFieldsHint')}
							</p>
						)}
					</div>

					<Button
						variant='secondary'
						onClick={() => onOpenChange(false)}
					>
						{t('common.close')}
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
