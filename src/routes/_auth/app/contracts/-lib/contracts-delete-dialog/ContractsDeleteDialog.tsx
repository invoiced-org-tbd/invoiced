import { deleteContractMutationOptions } from '@/api/contract/deleteContract';
import { Button } from '@/components/button/Button';
import { Dialog } from '@/components/dialog/Dialog';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

const contractsRouteApi = getRouteApi('/_auth/app/contracts/');

type ContractsDeleteDialogProps = {
	selectedContractId: string;
};
export const ContractsDeleteDialog = ({
	selectedContractId,
}: ContractsDeleteDialogProps) => {
	const { t } = useTranslate();

	const navigate = contractsRouteApi.useNavigate();
	const { isDeleting } = contractsRouteApi.useSearch();

	const { mutateAsync: deleteContract, isPending } = useMutation(
		deleteContractMutationOptions(),
	);

	const handleClose = () => {
		navigate({
			search: (prev) => ({
				...prev,
				selectedContractId: undefined,
				isDeleting: undefined,
			}),
		});
	};

	const handleDelete = async () => {
		await deleteContract({ id: selectedContractId });
		handleClose();
	};

	return (
		<Dialog.Root
			open={isDeleting}
			onOpenChange={handleClose}
		>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>
						{t('entity.deleteTitle', {
							entity: t('contracts.name'),
						})}
					</Dialog.Title>
					<Dialog.Description>
						{t('entity.deleteConfirmation', {
							entity: t('contracts.name'),
						})}
					</Dialog.Description>
				</Dialog.Header>

				<Dialog.Footer>
					<Button
						variant='secondary'
						onClick={handleClose}
						disabled={isPending}
					>
						{t('common.cancel')}
					</Button>

					<Button
						variant='destructive'
						onClick={handleDelete}
						isLoading={isPending}
					>
						{t('common.delete')}
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
