import { sendInvoiceToAccountingMutationOptions } from '@/api/invoice/sendInvoiceToAccounting';
import { Card } from '@/components/card/Card';
import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';
import { FileTextIcon, MailIcon } from 'lucide-react';
import { Button } from '@/components/button/Button';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { invoiceHasAutoSendConfigured } from '@/lib/invoice/invoiceAutoSend';

const invoicesRouteApi = getRouteApi('/_auth/app/invoices/');

type InvoiceCardHeaderProps = {
	invoice: GetInvoicesResponse[number];
};
export const InvoiceCardHeader = ({ invoice }: InvoiceCardHeaderProps) => {
	const { t } = useTranslate();

	const { mutate: sendToAccounting, isPending: isSendingToAccounting } =
		useMutation(sendInvoiceToAccountingMutationOptions());

	const canSendToAccounting = invoiceHasAutoSendConfigured(invoice);

	return (
		<Card.Header className='border-b flex-row justify-between items-center'>
			<div className='flex items-center gap-2'>
				<div className='bg-primary/10 text-primary-muted rounded-lg p-2'>
					<FileTextIcon
						className='size-8'
						strokeWidth={1.4}
					/>
				</div>

				<div className='flex flex-col'>
					<p className='font-medium leading-4'>{invoice.fileName}</p>
					<p className='text-sm text-muted-foreground'>
						{invoice.contract.client.companyName},{' '}
						{invoice.items.length === 1
							? invoice.items[0].description
							: t('invoices.list.itemsCount', { count: invoice.items.length })}
					</p>
				</div>
			</div>

			<div className='flex items-center gap-2'>
				{canSendToAccounting ? (
					<Button
						variant='secondary'
						size='xs'
						type='button'
						isLoading={isSendingToAccounting}
						onClick={() =>
							sendToAccounting({
								invoiceId: invoice.id,
							})
						}
					>
						<MailIcon />
						{t('invoices.list.sendToAccounting')}
					</Button>
				) : null}

				<invoicesRouteApi.Link
					to='.'
					search={{
						selectedInvoiceId: invoice.id,
						isViewingInvoice: true,
					}}
				>
					<Button
						variant='secondary'
						size='xs'
					>
						<FileTextIcon />
						{t('invoices.list.viewInvoice')}
					</Button>
				</invoicesRouteApi.Link>
			</div>
		</Card.Header>
	);
};
