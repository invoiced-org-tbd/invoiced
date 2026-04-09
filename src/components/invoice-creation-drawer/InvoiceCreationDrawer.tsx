import type { GetContractsResponse } from '@/api/contract/getContracts';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { Drawer } from '../drawer/Drawer';
import { InvoiceCreationForm } from './InvoiceCreationForm';

const contractRouteApi = getRouteApi('/_auth/app/contracts/');

type InvoiceCreationDrawerProps = {
	contractData: GetContractsResponse[number];
};
export const InvoiceCreationDrawer = ({
	contractData,
}: InvoiceCreationDrawerProps) => {
	const { t } = useTranslate();
	const navigate = contractRouteApi.useNavigate();
	const { isCreatingInvoice } = contractRouteApi.useSearch();

	const isOpen = isCreatingInvoice;

	const handleClose = () => {
		navigate({
			search: (prev) => ({ ...prev, isCreatingInvoice: undefined }),
		});
	};
	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={handleClose}
		>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>{t('invoices.creation.drawerTitle')}</Drawer.Title>
				</Drawer.Header>

				<InvoiceCreationForm contractData={contractData} />
			</Drawer.Content>
		</Drawer.Root>
	);
};
