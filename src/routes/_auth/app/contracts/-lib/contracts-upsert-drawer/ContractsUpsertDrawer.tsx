import { Drawer } from '@/components/drawer/Drawer';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { ContractsUpsertForm } from '../contracts-upsert-form/ContractsUpsertForm';

const contractsRouteApi = getRouteApi('/_auth/app/contracts/');

type ContractsUpsertDrawerProps = {
	selectedContractId: string;
};
export const ContractsUpsertDrawer = ({
	selectedContractId,
}: ContractsUpsertDrawerProps) => {
	const { t } = useTranslate();
	const { isCreating, isEditing } = contractsRouteApi.useSearch();
	const navigate = contractsRouteApi.useNavigate();

	const isOpen = isCreating || isEditing;

	const handleClose = (redirectId?: string) => {
		navigate({
			search: (prev) => ({
				...prev,
				selectedContractId: redirectId ?? selectedContractId,
				isCreating: undefined,
				isEditing: undefined,
				step: undefined,
			}),
		});
	};

	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={() => handleClose()}
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

				<ContractsUpsertForm
					isEditing={isEditing}
					selectedContractId={selectedContractId}
					onClose={handleClose}
				/>
			</Drawer.Content>
		</Drawer.Root>
	);
};
