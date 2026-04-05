import type { LinkProps } from '@tanstack/react-router';

export type OnboardingPanelManualStepId = 'invoiceSent';

type OnboardingPanelStepId =
	| 'company'
	| 'contract'
	| 'invoice'
	| 'smtp'
	| 'email-templates';

export type OnboardingPanelStep = {
	id: OnboardingPanelStepId;
	label: string;
	description: string;
	to?: LinkProps['to'];
	manualId?: OnboardingPanelManualStepId;
	done: boolean;
};

export type OnboardingPanelManualStepsState = Record<
	OnboardingPanelManualStepId,
	boolean
>;

export type OnboardingPanelDoneMap = Record<OnboardingPanelStepId, boolean>;
