import { Drawer } from '../drawer';
import { AccountDrawerForm } from './account-drawer-form';
import { useAccountDrawer } from '@/hooks/use-account-drawer';
import { useTranslate } from '@/hooks/use-translate/useTranslate';

export const AccountDrawer = () => {
	const isOpen = useAccountDrawer((state) => state.isOpen);
	const setIsOpen = useAccountDrawer((state) => state.setIsOpen);
	const { t } = useTranslate();

	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>{t('account.drawerTitle')}</Drawer.Title>
				</Drawer.Header>

				<AccountDrawerForm />
			</Drawer.Content>
		</Drawer.Root>
	);
};
