import { getInvoicesQueryOptions } from '@/api/invoice/getInvoices';
import { Page } from '@/components/page/Page';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/app/invoices/')({
	component: RouteComponent,
	loader: async ({ context }) => {
		context.queryClient.prefetchQuery(getInvoicesQueryOptions());
	},
});

function RouteComponent() {
	const { t } = useTranslate();

	const { data: invoices } = useSuspenseQuery(getInvoicesQueryOptions());

	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>{t('invoices.title')}</Page.Title>
			</Page.Header>

			<Page.Content>
				<div>
					{invoices.map((invoice) => (
						<div
							className='bg-muted p-4 rounded-lg'
							key={invoice.id}
						>
							{JSON.stringify(invoice, null, 2)}
						</div>
					))}
				</div>
			</Page.Content>
		</Page.Root>
	);
}
