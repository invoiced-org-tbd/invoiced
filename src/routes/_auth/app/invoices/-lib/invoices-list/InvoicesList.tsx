import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';
import { CardListView } from '@/components/card-list-view/CardListView';
import { InvoiceCard } from './InvoiceCard';
import { InvoiceListSelector } from './InvoiceListSelector';

type InvoicesListProps = {
	invoices: GetInvoicesResponse;
	selectedInvoice: GetInvoicesResponse[number];
};

export const InvoicesList = ({
	invoices,
	selectedInvoice,
}: InvoicesListProps) => {
	return (
		<CardListView.Root>
			<InvoiceListSelector
				invoices={invoices}
				selectedInvoice={selectedInvoice}
			/>

			<InvoiceCard invoice={selectedInvoice} />
		</CardListView.Root>
	);
};
