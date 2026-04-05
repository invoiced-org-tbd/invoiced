import { Card } from '@/components/card/Card';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { AnimatePresence, motion } from 'framer-motion';
import { OnboardingPanelStepRow } from './OnboardingPanelStepRow';
import type { OnboardingPanelManualStepId, OnboardingPanelStep } from './types';

type OnboardingPanelChecklistProps = {
	isExpanded: boolean;
	coreSteps: OnboardingPanelStep[];
	advancedSteps: OnboardingPanelStep[];
	isLoadingPanelData: boolean;
	onToggleManualStep: (stepId: OnboardingPanelManualStepId) => void;
};
export const OnboardingPanelChecklist = ({
	isExpanded,
	coreSteps,
	advancedSteps,
	isLoadingPanelData,
	onToggleManualStep,
}: OnboardingPanelChecklistProps) => {
	const { t } = useTranslate();

	return (
		<AnimatePresence initial={false}>
			{isExpanded && (
				<motion.div
					key='checklist-content'
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.24, ease: 'easeInOut' }}
				>
					<Card.Content className='space-y-4 px-4 pb-4'>
						<section className='space-y-2'>
							<p className='text-muted-foreground text-xs font-semibold uppercase'>
								{t('onboarding.sections.coreSetup')}
							</p>
							<div className='space-y-2'>
								{coreSteps.map((step) => (
									<OnboardingPanelStepRow
										key={step.id}
										step={step}
										isLoadingPanelData={isLoadingPanelData}
										isStepLoading={step.id === 'contract' && isLoadingPanelData}
										onToggleManualStep={onToggleManualStep}
									/>
								))}
							</div>
						</section>

						<section className='space-y-2'>
							<p className='text-muted-foreground text-xs font-semibold uppercase'>
								{t('onboarding.sections.advancedSetup')}
							</p>
							<div className='space-y-2'>
								{advancedSteps.map((step) => (
									<OnboardingPanelStepRow
										key={step.id}
										step={step}
										isLoadingPanelData={isLoadingPanelData}
										onToggleManualStep={onToggleManualStep}
									/>
								))}
							</div>
						</section>
					</Card.Content>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
