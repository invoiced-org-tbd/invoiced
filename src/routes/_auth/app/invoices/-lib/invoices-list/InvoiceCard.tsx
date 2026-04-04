import { CardListView } from '@/components/card-list-view/CardListView';
import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';
import { InvoiceCardContent } from './InvoiceCardContent';
import { InvoiceCardFooter } from './InvoiceCardFooter';
import { InvoiceCardHeader } from './InvoiceCardHeader';

type InvoiceCardProps = {
	invoice: GetInvoicesResponse[number];
};

export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
	return (
		<CardListView.Card.Root>
			<div className='space-y-4'>
				<InvoiceCardHeader invoice={invoice} />
				<InvoiceCardContent invoice={invoice} />
			</div>

			<InvoiceCardFooter />
		</CardListView.Card.Root>
	);
};
