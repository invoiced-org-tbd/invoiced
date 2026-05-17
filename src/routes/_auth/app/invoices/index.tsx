import { getInvoicesQueryOptions } from '@/api/invoice/getInvoices';
import { Page } from '@/components/page/Page';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { InvoicesList } from './-lib/invoices-list/InvoicesList';
import { objectKeys } from '@/utils/objectUtils';
import { FileIcon } from 'lucide-react';
import { Button } from '@/components/button/Button';
import { Link } from '@tanstack/react-router';

const invoicesSearchSchema = z.object({
	selectedInvoiceId: z.string().optional(),
	isViewingInvoice: z.boolean().optional(),
	isDeletingInvoice: z.boolean().optional(),
});

export const Route = createFileRoute('/_auth/app/invoices/')({
	validateSearch: zodValidator(invoicesSearchSchema),
	component: RouteComponent,
	beforeLoad: async ({ context, search }) => {
		const invoices = await context.queryClient.fetchQuery(
			getInvoicesQueryOptions(),
		);

		if (!invoices.length) {
			const searchKeys = objectKeys(search);
			if (!searchKeys.length) {
				return;
			}

			// if there's no invoices, search should be empty
			throw Route.redirect({
				to: '.',
				search: {},
			});
		}

		const selectedInvoice = invoices.find(
			(invoice) => invoice.id === search.selectedInvoiceId,
		);
		if (!selectedInvoice) {
			throw Route.redirect({
				to: '.',
				search: {
					selectedInvoiceId: invoices[0].id,
				},
			});
		}
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
					<div className='text-sm text-muted-foreground flex flex-col gap-8 items-center justify-center h-full'>
						<FileIcon className='size-20 text-primary' />
						<div className='flex flex-col gap-2 items-center justify-center'>
						  <p className='text-2xl font-medium text-foreground'>{t('invoices.list.emptyState')}</p>
							<p className='text-sm text-muted-foreground'>{t('invoices.list.emptyStateDescription')}</p>
						</div>
						<Button asChild variant='primary' size='lg'>
							<Link to='/app/contracts'>{t('invoices.list.createInvoice')}</Link>
						</Button>
					</div>
				)}
			</Page.Content>
		</Page.Root>
	);
}
