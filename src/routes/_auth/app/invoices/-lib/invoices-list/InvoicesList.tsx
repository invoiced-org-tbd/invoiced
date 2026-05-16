import { deleteInvoiceMutationOptions } from '@/api/invoice/deleteInvoice';
import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';
import { CardListView } from '@/components/card-list-view/CardListView';
import { DeleteDialog } from '@/components/delete-dialog/DeleteDialog';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { InvoiceCard } from './InvoiceCard';
import { InvoiceListSelector } from './InvoiceListSelector';

const invoicesRouteApi = getRouteApi('/_auth/app/invoices/');

type InvoicesListProps = {
	invoices: GetInvoicesResponse;
	selectedInvoice: GetInvoicesResponse[number];
};
export const InvoicesList = ({
	invoices,
	selectedInvoice,
}: InvoicesListProps) => {
	const navigate = invoicesRouteApi.useNavigate();
	const { isDeletingInvoice } = invoicesRouteApi.useSearch();
	const { t } = useTranslate();

	const isDeleteDialogOpen = !!isDeletingInvoice && !!selectedInvoice.id;

	const handleCloseDeleteDialog = () => {
		navigate({
			search: {},
		});
	};

	return (
		<>
			<CardListView.Root>
				<InvoiceListSelector
					invoices={invoices}
					selectedInvoice={selectedInvoice}
				/>

				<InvoiceCard invoice={selectedInvoice} />
			</CardListView.Root>

			<DeleteDialog
				title={t('entity.deleteTitle', {
					entity: t('invoices.name'),
				})}
				description={t('entity.deleteConfirmation', {
					entity: t('invoices.name'),
				})}
				selectedId={selectedInvoice.id}
				open={isDeleteDialogOpen}
				onClose={handleCloseDeleteDialog}
				deleteMutationOptions={deleteInvoiceMutationOptions()}
			/>
		</>
	);
};
