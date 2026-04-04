import { Card } from '@/components/card/Card';
import { useOnboardingPanel } from '@/hooks/use-onboarding-panel/useOnboardingPanel';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { OnboardingPanelChecklist } from './OnboardingPanelChecklist';
import { OnboardingPanelHeader } from './OnboardingPanelHeader';
import { useOnboardingPanelChecklist } from './useOnboardingPanelChecklist';

export const OnboardingPanel = () => {
	const [isExpanded, setIsExpanded] = useState(true);
	const isDismissed = useOnboardingPanel((state) => state.isDismissed);
	const dismiss = useOnboardingPanel((state) => state.dismiss);

	const {
		coreSteps,
		advancedSteps,
		completedCount,
		totalSteps,
		progress,
		isLoadingPanelData,
		toggleManualStep,
	} = useOnboardingPanelChecklist();

	const visibleProgress = isLoadingPanelData ? 0 : progress;

	if (isDismissed) {
		return null;
	}

	return (
		<motion.div
			className='pointer-events-none fixed bottom-5 right-5 z-20 w-88 max-w-[calc(100vw-1.5rem)]'
			initial={{ opacity: 0, y: 16, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.3, ease: 'easeOut' }}
		>
			<Card.Root className='pointer-events-auto overflow-hidden border-primary/20 shadow-lg backdrop-blur-sm'>
				<OnboardingPanelHeader
					completedCount={completedCount}
					totalSteps={totalSteps}
					isExpanded={isExpanded}
					onToggleExpanded={() => setIsExpanded((current) => !current)}
					onDismiss={dismiss}
				/>

				<div className='flex items-center gap-2 px-4 pb-4 pt-3'>
					<div className='bg-muted h-2 w-full overflow-hidden rounded-full'>
						<motion.div
							className='bg-primary h-full transition-[width] duration-300 ease-out'
							initial={false}
							style={{ width: `${visibleProgress}%` }}
							animate={{ width: `${visibleProgress}%` }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
						/>
					</div>
					<p className='text-muted-foreground text-xs'>{visibleProgress}%</p>
				</div>

				<OnboardingPanelChecklist
					isExpanded={isExpanded}
					coreSteps={coreSteps}
					advancedSteps={advancedSteps}
					isLoadingPanelData={isLoadingPanelData}
					onToggleManualStep={toggleManualStep}
				/>
			</Card.Root>
		</motion.div>
	);
};
