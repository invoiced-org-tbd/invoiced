import { Drawer } from '../drawer';
import { AccountDrawerForm } from './account-drawer-form';
import { useAccountDrawer } from '@/hooks/use-account-drawer/useAccountDrawer';

export const AccountDrawer = () => {
	const isOpen = useAccountDrawer((state) => state.isOpen);
	const setIsOpen = useAccountDrawer((state) => state.setIsOpen);

	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>Account</Drawer.Title>
				</Drawer.Header>

				<AccountDrawerForm />
			</Drawer.Content>
		</Drawer.Root>
	);
};
