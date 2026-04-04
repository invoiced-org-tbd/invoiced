import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { OnboardingPanelDoneMap, OnboardingPanelStep } from './types';

type UseOnboardingPanelCoreStepsParams = {
	doneMap: OnboardingPanelDoneMap;
};
export const useOnboardingPanelCoreSteps = ({
	doneMap,
}: UseOnboardingPanelCoreStepsParams) => {
	const { t } = useTranslate();

	const coreSteps = [
		{
			id: 'company',
			to: '/app/settings',
			label: t('onboarding.steps.company.label'),
			description: t('onboarding.steps.company.description'),
			done: doneMap.company,
		},
		{
			id: 'contract',
			to: '/app/contracts',
			label: t('onboarding.steps.contract.label'),
			description: t('onboarding.steps.contract.description'),
			done: doneMap.contract,
		},
		{
			id: 'invoice',
			to: '/app/invoices',
			manualId: 'invoiceSent',
			label: t('onboarding.steps.invoice.label'),
			description: t('onboarding.steps.invoice.description'),
			done: doneMap.invoice,
		},
	] satisfies OnboardingPanelStep[] as OnboardingPanelStep[];

	return {
		coreSteps,
	};
};
