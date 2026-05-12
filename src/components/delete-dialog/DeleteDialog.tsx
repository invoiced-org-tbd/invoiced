import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { Button } from '../button/Button';
import { Dialog } from '../dialog/Dialog';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

type DeleteDialogProps<
	TData = unknown,
	TError = Error,
	TOnMutateResult = unknown,
> = {
	title: string;
	description: string;
	selectedId: string;
	open: boolean;
	onClose: () => void;
	deleteMutationOptions: UseMutationOptions<
		TData,
		TError,
		{ id: string },
		TOnMutateResult
	>;
};

export const DeleteDialog = <
	TData = unknown,
	TError = Error,
	TOnMutateResult = unknown,
>({
	title,
	description,
	open,
	onClose,
	deleteMutationOptions,
	selectedId,
}: DeleteDialogProps<TData, TError, TOnMutateResult>) => {
	const { t } = useTranslate();

	const { mutateAsync: deleteItem, isPending } = useMutation(
		deleteMutationOptions,
	);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			onClose();
		}
	};

	const handleDelete = async () => {
		await deleteItem({ id: selectedId });
		onClose();
	};

	return (
		<Dialog.Root
			open={open}
			onOpenChange={handleOpenChange}
		>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>{title}</Dialog.Title>
					<Dialog.Description>{description}</Dialog.Description>
				</Dialog.Header>
				<Dialog.Footer>
					<Dialog.Close asChild>
						<Button
							variant='secondary'
							onClick={onClose}
							disabled={isPending}
						>
							{t('common.cancel')}
						</Button>
					</Dialog.Close>
					<Button
						onClick={handleDelete}
						variant='destructive'
						isLoading={isPending}
					>
						{t('common.delete')}
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
