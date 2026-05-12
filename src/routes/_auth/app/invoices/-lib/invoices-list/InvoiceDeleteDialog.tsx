import { deleteInvoiceMutationOptions } from '@/api/invoice/deleteInvoice';
import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';
import { Button } from '@/components/button/Button';
import { Dialog } from '@/components/dialog/Dialog';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

const invoicesRouteApi = getRouteApi('/_auth/app/invoices/');

type InvoiceDeleteDialogProps = {
	invoice: GetInvoicesResponse[number];
};
export const InvoiceDeleteDialog = ({ invoice }: InvoiceDeleteDialogProps) => {
	const navigate = invoicesRouteApi.useNavigate();
	const { isDeletingInvoice } = invoicesRouteApi.useSearch();

	const { t } = useTranslate();

	const isOpen = isDeletingInvoice && !!invoice.id;

	const { mutateAsync: deleteInvoice, isPending } = useMutation(
		deleteInvoiceMutationOptions(),
	);

	const handleClose = () => {
		navigate({
			search: {},
		});
	};

	const handleDelete = async () => {
		await deleteInvoice({ id: invoice.id });
		handleClose();
	};

	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={handleClose}
		>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Delete Invoice</Dialog.Title>
				</Dialog.Header>

				<Dialog.Footer>
					<Dialog.Close asChild>
						<Button
							variant='secondary'
							disabled={isPending}
						>
							{t('common.cancel')}
						</Button>
					</Dialog.Close>

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
