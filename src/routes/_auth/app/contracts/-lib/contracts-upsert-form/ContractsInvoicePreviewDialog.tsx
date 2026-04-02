import { Button } from '@/components/button/Button';
import { Dialog } from '@/components/dialog/Dialog';
import { InvoicePDF } from '@/components/invoice-pdf/InvoicePDF';
import { useCompany } from '@/hooks/use-company/useCompany';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { startOfToday } from 'date-fns';
import type { InvoicePDFContractData } from '@/components/invoice-pdf/types';

type ContractsInvoicePreviewDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	contractData: InvoicePDFContractData;
	isIncomplete?: boolean;
};

export const ContractsInvoicePreviewDialog = ({
	open,
	onOpenChange,
	contractData,
	isIncomplete = false,
}: ContractsInvoicePreviewDialogProps) => {
	const { company } = useCompany();
	const { t } = useTranslate();

	if (!company) {
		return null;
	}

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
						contractData={contractData}
						company={company}
						issueDate={startOfToday()}
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
