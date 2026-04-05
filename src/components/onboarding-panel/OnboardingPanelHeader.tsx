import { Button } from '@/components/button/Button';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { motion } from 'framer-motion';
import { ChevronDownIcon, EyeOffIcon, RocketIcon } from 'lucide-react';

type OnboardingPanelHeaderProps = {
	completedCount: number;
	totalSteps: number;
	isExpanded: boolean;
	onToggleExpanded: () => void;
	onDismiss: () => void;
};

export const OnboardingPanelHeader = ({
	completedCount,
	totalSteps,
	isExpanded,
	onToggleExpanded,
	onDismiss,
}: OnboardingPanelHeaderProps) => {
	const { t } = useTranslate();

	return (
		<div className='flex items-stretch gap-2 border-b border-primary/20 bg-linear-to-br from-primary/10 via-transparent to-muted/30 px-4 py-3 w-full'>
			<button
				type='button'
				onClick={onToggleExpanded}
				className='flex min-w-0 flex-1 items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30'
			>
				<RocketIcon className='size-5 text-primary' />
				<div className='min-w-0'>
					<p className='text-sm font-semibold'>{t('onboarding.title')}</p>
					<p className='text-muted-foreground truncate text-xs'>
						{t('onboarding.completed', {
							completed: completedCount,
							total: totalSteps,
						})}
					</p>
				</div>
			</button>

			<div className='flex items-center gap-2'>
				<motion.div
					animate={{ rotate: isExpanded ? 0 : 180 }}
					transition={{ duration: 0.2 }}
				>
					<Button
						size='xs'
						variant='secondary'
						isGhost
						isIcon
						tooltip={
							isExpanded ? t('common.close') : t<'common.open'>('common.open')
						}
						onClick={onToggleExpanded}
					>
						<ChevronDownIcon className='size-4 shrink-0 text-muted-foreground' />
					</Button>
				</motion.div>

				<Button
					size='xs'
					variant='secondary'
					isGhost
					isIcon
					tooltip={t('onboarding.actions.dismiss')}
					onClick={onDismiss}
				>
					<EyeOffIcon />
				</Button>
			</div>
		</div>
	);
};
