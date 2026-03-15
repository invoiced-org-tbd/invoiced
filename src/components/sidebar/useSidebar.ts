import { create } from 'zustand';
import type { SidebarContextValue } from './types';
import { persist } from 'zustand/middleware';

export const useSidebar = create<SidebarContextValue>()(
	persist(
		(set) => ({
			open: false,
			setOpen: (open) => set({ open }),
			isMobile: false,
			setIsMobile: (isMobile) => set({ isMobile }),
			toggleSidebar: () => set((state) => ({ open: !state.open })),
		}),
		{
			name: 'sidebar',
			version: 0.1,
		},
	),
);
