import { Drawer } from '@/components/drawer';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { ContractsUpsertForm } from '../contracts-upsert-form';

const contractsRouteApi = getRouteApi('/_auth/app/contracts/');

export const ContractsUpsertDrawer = () => {
	const { t } = useTranslate();
	const { isCreating, editId } = contractsRouteApi.useSearch();
	const navigate = contractsRouteApi.useNavigate();

	const isOpen = isCreating || !!editId;

	const handleClose = () => {
		navigate({
			search: (prev) => ({
				...prev,
				isCreating: undefined,
				editId: undefined,
				tab: undefined,
			}),
		});
	};

	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={handleClose}
		>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>
						{isCreating
							? t('entity.addTitle', {
									entity: t('contracts.name'),
								})
							: t('entity.editTitle', {
									entity: t('contracts.name'),
								})}
					</Drawer.Title>
				</Drawer.Header>

				<Drawer.Body>
					<ContractsUpsertForm
						editId={editId}
						onSuccess={handleClose}
					/>
				</Drawer.Body>
			</Drawer.Content>
		</Drawer.Root>
	);
};
