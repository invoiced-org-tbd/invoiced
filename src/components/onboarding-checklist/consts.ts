import type { OnboardingStepTemplate } from './types';

export const CORE_SETUP_STEPS: OnboardingStepTemplate[] = [
	{
		id: 'company',
		labelKey: 'onboarding.steps.company.label',
		descriptionKey: 'onboarding.steps.company.description',
		to: '/app/settings',
	},
	{
		id: 'contract',
		labelKey: 'onboarding.steps.contract.label',
		descriptionKey: 'onboarding.steps.contract.description',
		to: '/app/contracts',
	},
	{
		id: 'invoice',
		labelKey: 'onboarding.steps.invoice.label',
		descriptionKey: 'onboarding.steps.invoice.description',
		to: '/app/invoices',
		manualId: 'invoiceSent',
	},
];

export const ADVANCED_SETUP_STEPS: OnboardingStepTemplate[] = [
	{
		id: 'smtp',
		labelKey: 'onboarding.steps.smtp.label',
		descriptionKey: 'onboarding.steps.smtp.description',
		to: '/app/settings',
	},
	{
		id: 'email-templates',
		labelKey: 'onboarding.steps.emailTemplates.label',
		descriptionKey: 'onboarding.steps.emailTemplates.description',
		to: '/app/settings',
	},
];
