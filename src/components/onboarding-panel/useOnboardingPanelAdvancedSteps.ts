import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { OnboardingPanelDoneMap, OnboardingPanelStep } from './types';

type UseOnboardingPanelAdvancedStepsParams = {
	doneMap: OnboardingPanelDoneMap;
};
export const useOnboardingPanelAdvancedSteps = ({
	doneMap,
}: UseOnboardingPanelAdvancedStepsParams) => {
	const { t } = useTranslate();

	const advancedSteps = [
		{
			id: 'smtp',
			to: '/app/settings',
			label: t('onboarding.steps.smtp.label'),
			description: t('onboarding.steps.smtp.description'),
			done: doneMap.smtp,
		},
		{
			id: 'email-templates',
			to: '/app/settings',
			label: t('onboarding.steps.emailTemplates.label'),
			description: t('onboarding.steps.emailTemplates.description'),
			done: doneMap['email-templates'],
		},
	] satisfies OnboardingPanelStep[] as OnboardingPanelStep[];

	return {
		advancedSteps,
	};
};
