import { create } from 'zustand';
import type { UseAccountDrawer } from './types';

export const useAccountDrawer = create<UseAccountDrawer>()((set) => ({
	isOpen: false,
	setIsOpen: (isOpen) => set({ isOpen }),
	toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
