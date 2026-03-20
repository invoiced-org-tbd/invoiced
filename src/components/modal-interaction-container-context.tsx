import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

const ModalInteractionContainerContext = createContext<HTMLElement | null>(null);

type ModalInteractionContainerProviderProps = {
	value: HTMLElement | null;
	children: ReactNode;
};

export const ModalInteractionContainerProvider = ({
	value,
	children,
}: ModalInteractionContainerProviderProps) => {
	return (
		<ModalInteractionContainerContext.Provider value={value}>
			{children}
		</ModalInteractionContainerContext.Provider>
	);
};

export const useModalInteractionContainer = () => {
	return useContext(ModalInteractionContainerContext);
};
