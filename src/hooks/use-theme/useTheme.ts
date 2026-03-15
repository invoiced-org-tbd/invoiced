import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UseTheme } from './types';
import { isServer } from '@tanstack/react-query';

export const useTheme = create<UseTheme>()(
	persist(
		(set) => ({
			theme: 'light',
			setTheme: (theme) => set({ theme }),
			toggleTheme: () =>
				set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
		}),
		{
			name: 'theme',
		},
	),
);

useTheme.subscribe((state) => {
	if (isServer) {
		return;
	}

	document.documentElement.classList.toggle('dark', state.theme === 'dark');
});
