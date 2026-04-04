import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';
import { CardListView } from '@/components/card-list-view/CardListView';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { formatCurrency } from '@/utils/currencyUtils';
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
					const totalAmount = invoice.items.reduce(
						(acc, item) => acc + item.amount,
						0,
					);

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
								<p className='font-medium text-foreground'>
									{invoice.fileName}
								</p>
								<p>
									{invoice.contract.client.companyName},{' '}
									{invoice.items.length === 1
										? invoice.items[0].description
										: t('invoices.list.itemsCount', {
												count: invoice.items.length,
											})}
								</p>
								<p className='text-primary-muted'>
									{formatCurrency({ value: totalAmount })}
								</p>
							</invoicesRouteApi.Link>
						</CardListView.List.Item>
					);
				})}

				<CardListView.List.CreateItem asChild>
					<button type='button'>
						<PlusIcon className='size-4' />
						{t('invoices.list.createInvoice')}
					</button>
				</CardListView.List.CreateItem>
			</CardListView.List.Content>
		</CardListView.List.Root>
	);
};
