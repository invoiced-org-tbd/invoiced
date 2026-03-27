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
	labelKey: OnboardingStepTranslationKey;
	descriptionKey: OnboardingStepTranslationKey;
	to?: OnboardingRoute;
	manualId?: ManualStepId;
};

export type ManualStepsState = Record<ManualStepId, boolean>;

export type OnboardingStep = OnboardingStepTemplate & {
	done: boolean;
};

export type OnboardingStepTranslationKey =
	| 'onboarding.steps.company.label'
	| 'onboarding.steps.company.description'
	| 'onboarding.steps.contract.label'
	| 'onboarding.steps.contract.description'
	| 'onboarding.steps.invoice.label'
	| 'onboarding.steps.invoice.description'
	| 'onboarding.steps.smtp.label'
	| 'onboarding.steps.smtp.description'
	| 'onboarding.steps.emailTemplates.label'
	| 'onboarding.steps.emailTemplates.description';
