import { Button } from '@/components/button/Button';
import { Dialog } from '@/components/dialog/Dialog';
import { InvoicePDF } from '@/components/invoice-pdf/InvoicePDF';
import { useCompany } from '@/hooks/use-company/useCompany';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { ContractsUpsertFormSchema } from './contractsUpsertFormSchemas';

type ContractsInvoicePreviewDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	contractData: ContractsUpsertFormSchema;
	canSubmit: boolean;
};

export const ContractsInvoicePreviewDialog = ({
	open,
	onOpenChange,
	contractData,
	canSubmit,
}: ContractsInvoicePreviewDialogProps) => {
	const { company } = useCompany();
	const { t } = useTranslate();
	const isBrowser = typeof window !== 'undefined';

	return (
		<Dialog.Root
			open={open}
			onOpenChange={onOpenChange}
		>
			<Dialog.Content className='sm:max-w-[92vw] w-[1100px] h-[82vh] p-0 gap-0 overflow-hidden'>
				<Dialog.Header className='px-4 py-3 border-b'>
					<div className='flex items-start justify-between gap-2 pr-10'>
						<div className='space-y-1'>
							<Dialog.Title>{t('contracts.invoicePreview.title')}</Dialog.Title>
							<Dialog.Description>
								{t('contracts.invoicePreview.description')}
							</Dialog.Description>
						</div>
					</div>
				</Dialog.Header>

				<Dialog.Body className='bg-muted'>
					{isBrowser ? (
						<InvoicePDF
							model='base-v0'
							contractData={contractData}
							company={company}
						/>
					) : (
						<div className='h-full rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground'>
							{t('contracts.invoicePreview.browserOnlyMessage')}
						</div>
					)}
				</Dialog.Body>

				<Dialog.Footer>
					{!canSubmit ? (
						<p className='text-xs text-muted-foreground mr-auto'>
							{t('contracts.invoicePreview.incompleteFieldsHint')}
						</p>
					) : null}

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
