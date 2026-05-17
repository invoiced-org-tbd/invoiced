import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { DownloadIcon, TrashIcon } from 'lucide-react';
import { useDownloadInvoice } from '../useDownloadInvoice';

const invoicesRouteApi = getRouteApi('/_auth/app/invoices/');

type InvoiceCardFooterProps = {
	invoice: GetInvoicesResponse[number];
};

export const InvoiceCardFooter = ({ invoice }: InvoiceCardFooterProps) => {
	const { t } = useTranslate();
	const { downloadInvoice, isDownloading } = useDownloadInvoice();

	return (
		<Card.Footer className='flex-row justify-between items-center border-t pt-5 mx-2 px-2'>
			<div></div>

			<div className='flex items-center gap-2'>
				<Button
					variant='secondary'
					size='xxs'
					isOutlined
					isLoading={isDownloading}
					onClick={() => downloadInvoice(invoice)}
				>
					<DownloadIcon />
					{t('invoices.list.downloadInvoice')}
				</Button>

				<invoicesRouteApi.Link
					to='.'
					search={(prev) => ({ ...prev, isDeletingInvoice: true })}
				>
					<Button
						variant='destructive'
						size='xxs'
						isOutlined
					>
						<TrashIcon />
						{t('invoices.list.deleteInvoice')}
					</Button>
				</invoicesRouteApi.Link>
			</div>
		</Card.Footer>
	);
};
