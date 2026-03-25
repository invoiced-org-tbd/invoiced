import type { OnboardingStepTemplate } from './types';

export const CORE_SETUP_STEPS: OnboardingStepTemplate[] = [
	{
		id: 'company',
		label: 'Create your Company',
		description: 'Set your business profile and legal details.',
		to: '/app/settings',
	},
	{
		id: 'contract',
		label: 'Add your first Contract',
		description: 'Create at least one contract to start billing.',
		to: '/app/contracts',
	},
	{
		id: 'invoice',
		label: 'Send an Invoice',
		description: 'Mark this when your first invoice is sent.',
		to: '/app/invoices',
		manualId: 'invoiceSent',
	},
];

export const ADVANCED_SETUP_STEPS: OnboardingStepTemplate[] = [
	{
		id: 'smtp',
		label: 'Setup SMTP',
		description: 'Configure your SMTP provider for outbound email.',
		to: '/app/settings',
		manualId: 'smtpSetup',
	},
	{
		id: 'email-templates',
		label: 'Setup email templates',
		description: 'Define your default invoice email templates.',
		to: '/app/settings',
		manualId: 'emailTemplatesSetup',
	},
];
