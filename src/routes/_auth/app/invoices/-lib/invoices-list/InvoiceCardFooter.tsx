import { Card } from '@/components/card/Card';
import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';

type InvoiceCardFooterProps = {
	invoice: GetInvoicesResponse[number];
};

export const InvoiceCardFooter = ({ invoice }: InvoiceCardFooterProps) => {
	return <Card.Footer>{String(invoice.createdAt)}</Card.Footer>;
};
