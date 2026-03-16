import { Drawer } from '@/components/drawer';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { ContractsUpsertForm } from '../contracts-upsert-form';

const contractsRouteApi = getRouteApi('/_auth/app/contracts/');

export const ContractsUpsertDrawer = () => {
	const { t } = useTranslate();
	const { isCreating } = contractsRouteApi.useSearch();
	const navigate = contractsRouteApi.useNavigate();

	const handleClose = () => {
		navigate({
			search: (prev) => ({
				...prev,
				isCreating: undefined,
			}),
		});
	};

	return (
		<Drawer.Root
			open={isCreating}
			onOpenChange={handleClose}
		>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>
						{isCreating
							? t('contracts.upsertDrawer.createTitle')
							: t('contracts.upsertDrawer.editTitle')}
					</Drawer.Title>
				</Drawer.Header>

				<Drawer.Body>
					<ContractsUpsertForm />
				</Drawer.Body>
			</Drawer.Content>
		</Drawer.Root>
	);
};
