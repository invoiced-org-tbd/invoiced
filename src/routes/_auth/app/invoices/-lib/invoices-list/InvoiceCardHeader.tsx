import { Card } from '@/components/card/Card';
import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';

type InvoiceCardHeaderProps = {
	invoice: GetInvoicesResponse[number];
};

export const InvoiceCardHeader = ({ invoice }: InvoiceCardHeaderProps) => {
	return (
		<Card.Header>
			<Card.Title>{invoice.id}</Card.Title>
		</Card.Header>
	);
};
