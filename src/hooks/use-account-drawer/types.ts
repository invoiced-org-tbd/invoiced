export type UseAccountDrawerProps = {
	isOpen: boolean;
};

export type UseAccountDrawerActions = {
	setIsOpen: (isOpen: boolean) => void;
	toggleIsOpen: () => void;
};

export type UseAccountDrawer = UseAccountDrawerProps & UseAccountDrawerActions;
