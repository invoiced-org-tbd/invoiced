import { Page } from '@/components/page/Page';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useUser } from '@/hooks/use-user/useUser';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/app/')({
	component: RouteComponent,
});

function RouteComponent() {
	const user = useUser();
	const { t } = useTranslate();

	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>{t('auth.dashboardTitle')}</Page.Title>
			</Page.Header>

			<Page.Content>
				<div className='mt-5 flex flex-col gap-2'>
					<h2>{t('dashboard.message', { name: user.name })}</h2>
				</div>
			</Page.Content>
		</Page.Root>
	);
}
