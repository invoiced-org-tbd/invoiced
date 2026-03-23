import { Page } from '@/components/page';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/app/invoices/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslate();

	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>{t('invoices.title')}</Page.Title>
			</Page.Header>

			<Page.Content>
				<div>Hello "/_auth/app/invoices/"!</div>
			</Page.Content>
		</Page.Root>
	);
}
