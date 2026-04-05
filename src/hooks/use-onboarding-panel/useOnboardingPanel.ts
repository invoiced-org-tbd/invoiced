import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UseOnboardingPanel } from './types';

const DEFAULT_MANUAL_STEPS = {
	invoiceSent: false,
};

export const useOnboardingPanel = create<UseOnboardingPanel>()(
	persist(
		(set) => ({
			isDismissed: false,
			manualSteps: DEFAULT_MANUAL_STEPS,
			dismiss: () => set({ isDismissed: true }),
			restore: () => set({ isDismissed: false }),
			toggleManualStep: (stepId) =>
				set((state) => ({
					manualSteps: {
						...state.manualSteps,
						[stepId]: !state.manualSteps[stepId],
					},
				})),
		}),
		{
			name: 'onboarding-panel',
			version: 0.1,
		},
	),
);
