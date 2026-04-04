import { getInvoicesQueryOptions } from '@/api/invoice/getInvoices';
import { Page } from '@/components/page/Page';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { InvoicesList } from './-lib/invoices-list/InvoicesList';

const invoicesSearchSchema = z.object({
	selectedInvoiceId: z.string().optional(),
});

export const Route = createFileRoute('/_auth/app/invoices/')({
	validateSearch: zodValidator(invoicesSearchSchema),
	component: RouteComponent,
	loader: async ({ context }) => {
		context.queryClient.prefetchQuery(getInvoicesQueryOptions());
	},
});

function RouteComponent() {
	const { t } = useTranslate();
	const { selectedInvoiceId } = Route.useSearch();

	const { data: invoices } = useSuspenseQuery(getInvoicesQueryOptions());
	const resolvedInvoiceData =
		invoices.find((invoice) => invoice.id === selectedInvoiceId) ?? invoices[0];
	const hasInvoices = !!resolvedInvoiceData;

	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>{t('invoices.title')}</Page.Title>
			</Page.Header>

			<Page.Content>
				{hasInvoices ? (
					<InvoicesList
						invoices={invoices}
						selectedInvoice={resolvedInvoiceData}
					/>
				) : (
					<div className='bg-muted rounded-lg p-6 text-sm text-muted-foreground'>
						{t('invoices.list.emptyState')}
					</div>
				)}
			</Page.Content>
		</Page.Root>
	);
}
