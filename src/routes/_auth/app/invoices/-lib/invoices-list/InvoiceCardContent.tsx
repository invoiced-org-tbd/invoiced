import { Card } from '@/components/card/Card';
import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';

type InvoiceCardContentProps = {
	invoice: GetInvoicesResponse[number];
};

export const InvoiceCardContent = ({ invoice }: InvoiceCardContentProps) => {
	return (
		<Card.Content>
			<pre className='bg-muted rounded-lg p-3 text-xs overflow-auto'>
				{JSON.stringify(invoice, null, 2)}
			</pre>
		</Card.Content>
	);
};
