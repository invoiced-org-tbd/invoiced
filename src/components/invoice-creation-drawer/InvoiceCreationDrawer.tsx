import type { GetContractsResponse } from '@/api/contract/getContracts';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { Drawer } from '../drawer/Drawer';
import { InvoiceCreationForm } from './InvoiceCreationForm';

type InvoiceCreationDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	contractData: GetContractsResponse[number];
};
export const InvoiceCreationDrawer = ({
	isOpen,
	onClose,
	contractData,
}: InvoiceCreationDrawerProps) => {
	const { t } = useTranslate();

	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={onClose}
		>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>{t('invoices.creation.drawerTitle')}</Drawer.Title>
				</Drawer.Header>

				<InvoiceCreationForm
					contractData={contractData}
					onClose={onClose}
				/>
			</Drawer.Content>
		</Drawer.Root>
	);
};
