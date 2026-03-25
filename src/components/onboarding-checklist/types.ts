export type OnboardingRoute = '/app/contracts' | '/app/invoices' | '/app/settings';

export type ManualStepId = 'invoiceSent' | 'smtpSetup' | 'emailTemplatesSetup';

export type OnboardingStepId =
	| 'company'
	| 'contract'
	| 'invoice'
	| 'smtp'
	| 'email-templates';

export type OnboardingStepTemplate = {
	id: OnboardingStepId;
	label: string;
	description: string;
	to?: OnboardingRoute;
	manualId?: ManualStepId;
};

export type ManualStepsState = Record<ManualStepId, boolean>;

export type OnboardingStep = OnboardingStepTemplate & {
	done: boolean;
};
