import { Page } from '@/components/page/Page';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/app/cashflow/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslate();

	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>{t('auth.sidebar.cashflow')}</Page.Title>
			</Page.Header>
			<Page.Content>
				<div>{t('auth.sidebar.cashflow')}</div>
			</Page.Content>
		</Page.Root>
	);
}
