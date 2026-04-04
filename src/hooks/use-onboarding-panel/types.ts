import type {
	OnboardingPanelManualStepId,
	OnboardingPanelManualStepsState,
} from '@/components/onboarding-panel/types';

type UseOnboardingPanelProps = {
	isDismissed: boolean;
	manualSteps: OnboardingPanelManualStepsState;
};

type UseOnboardingPanelActions = {
	dismiss: () => void;
	restore: () => void;
	toggleManualStep: (stepId: OnboardingPanelManualStepId) => void;
};

export type UseOnboardingPanel = UseOnboardingPanelProps &
	UseOnboardingPanelActions;
