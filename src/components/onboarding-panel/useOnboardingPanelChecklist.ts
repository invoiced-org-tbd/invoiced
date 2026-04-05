import { getContractsQueryOptions } from '@/api/contract/getContracts';
import { getEmailTemplatesQueryOptions } from '@/api/email-template/getEmailTemplates';
import { getSmtpConfigsQueryOptions } from '@/api/smtp/getSmtpConfigs';
import { useOnboardingPanel } from '@/hooks/use-onboarding-panel/useOnboardingPanel';
import { useCompany } from '@/hooks/use-company/useCompany';
import { useQuery } from '@tanstack/react-query';
import { useOnboardingPanelAdvancedSteps } from './useOnboardingPanelAdvancedSteps';
import { useOnboardingPanelCoreSteps } from './useOnboardingPanelCoreSteps';
import type { OnboardingPanelDoneMap } from './types';

export const useOnboardingPanelChecklist = () => {
	const { company } = useCompany();

	const manualSteps = useOnboardingPanel((state) => state.manualSteps);
	const toggleManualStep = useOnboardingPanel(
		(state) => state.toggleManualStep,
	);

	const { data: contracts, isPending: isContractsPending } = useQuery(
		getContractsQueryOptions(),
	);
	const { data: smtpConfigs, isPending: isSmtpConfigsPending } = useQuery(
		getSmtpConfigsQueryOptions(),
	);
	const { data: emailTemplates, isPending: isEmailTemplatesPending } = useQuery(
		getEmailTemplatesQueryOptions(),
	);

	const isLoadingPanelData =
		isContractsPending || isSmtpConfigsPending || isEmailTemplatesPending;

	const isCreateCompanyDone = !!company;
	const isCreateContractDone = !!contracts?.length;
	const isSendInvoiceDone = manualSteps.invoiceSent;
	const isCreateSmtpDone = !!smtpConfigs?.length;
	const isCreateEmailTemplatesDone = !!emailTemplates?.length;

	const doneMap = {
		company: isCreateCompanyDone,
		contract: isCreateContractDone,
		invoice: isSendInvoiceDone,
		smtp: isCreateSmtpDone,
		'email-templates': isCreateEmailTemplatesDone,
	} satisfies OnboardingPanelDoneMap;

	const { coreSteps } = useOnboardingPanelCoreSteps({ doneMap });
	const { advancedSteps } = useOnboardingPanelAdvancedSteps({ doneMap });

	const allSteps = [...coreSteps, ...advancedSteps];
	const totalSteps = allSteps.length;
	const completedCount = allSteps.filter((step) => step.done).length;
	const progress = isLoadingPanelData
		? 0
		: Math.round((completedCount / totalSteps) * 100);

	return {
		isCreateCompanyDone,
		isCreateContractDone,
		isSendInvoiceDone,
		isCreateSmtpDone,
		isCreateEmailTemplatesDone,
		isLoadingPanelData,
		coreSteps,
		advancedSteps,
		completedCount,
		totalSteps,
		progress,
		toggleManualStep,
	};
};
