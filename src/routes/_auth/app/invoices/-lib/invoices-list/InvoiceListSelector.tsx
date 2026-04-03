import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';
import { CardListView } from '@/components/card-list-view/CardListView';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';

const invoicesRouteApi = getRouteApi('/_auth/app/invoices/');

type InvoiceListSelectorProps = {
	invoices: GetInvoicesResponse;
	selectedInvoice: GetInvoicesResponse[number];
};

export const InvoiceListSelector = ({
	invoices,
	selectedInvoice,
}: InvoiceListSelectorProps) => {
	const { t } = useTranslate();
	const totalInvoices = invoices.length;
	const showTotalInvoices = totalInvoices > 1;

	return (
		<CardListView.List.Root>
			<CardListView.List.Title>
				{t('invoices.title')} {showTotalInvoices && `(${totalInvoices})`}
			</CardListView.List.Title>

			<CardListView.List.Content>
				{invoices.map((invoice) => {
					const isSelected = invoice.id === selectedInvoice.id;

					return (
						<CardListView.List.Item
							asChild
							key={invoice.id}
							isSelected={isSelected}
						>
							<invoicesRouteApi.Link
								to='.'
								search={(prev) => ({ ...prev, selectedInvoiceId: invoice.id })}
							>
								<p className='font-medium text-foreground'>{invoice.id}</p>
							</invoicesRouteApi.Link>
						</CardListView.List.Item>
					);
				})}

				<CardListView.List.CreateItem asChild>
					<button type='button'>
						<PlusIcon className='size-4' />
						Create invoice
					</button>
				</CardListView.List.CreateItem>
			</CardListView.List.Content>
		</CardListView.List.Root>
	);
};
