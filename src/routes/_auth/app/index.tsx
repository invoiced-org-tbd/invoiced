import { Page } from '@/components/page';
import { useUser } from '@/hooks/use-user';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/app/')({
	component: RouteComponent,
});

function RouteComponent() {
	const user = useUser();

	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>Dashboard</Page.Title>
			</Page.Header>

			<Page.Content>
				<div className='mt-5 flex flex-col gap-2'>
					<h2>Welcome back, {user.name}.</h2>
				</div>
			</Page.Content>
		</Page.Root>
	);
}
