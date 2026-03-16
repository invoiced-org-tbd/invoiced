import { deleteContractMutationOptions } from '@/api/contract/deleteContract';
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

const contractsRouteApi = getRouteApi('/_auth/app/contracts/');

export const ContractsDeleteDialog = () => {
	const { t } = useTranslate();

	const { deleteId } = contractsRouteApi.useSearch();
	const navigate = contractsRouteApi.useNavigate();
	const isOpen = !!deleteId;

	const { mutateAsync: deleteContract, isPending } = useMutation(
		deleteContractMutationOptions(),
	);

	const handleClose = () => {
		navigate({
			search: (prev) => ({
				...prev,
				deleteId: undefined,
			}),
		});
	};

	const handleDelete = async () => {
		if (!deleteId) {
			return;
		}

		await deleteContract({ id: deleteId });
		handleClose();
	};

	return (
		<Dialog.Root
			open={isOpen}
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
