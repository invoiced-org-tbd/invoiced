import { Button } from '@/components/button/Button';
import { Tooltip } from '@/components/tooltip/Tooltip';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
	CheckCircle2Icon,
	ChevronRightIcon,
	CircleHelpIcon,
	CircleIcon,
} from 'lucide-react';
import { cn } from '@/utils/classNamesUtils';
import type { OnboardingPanelManualStepId, OnboardingPanelStep } from './types';

type OnboardingPanelStepRowProps = {
	step: OnboardingPanelStep;
	isLoadingPanelData: boolean;
	isStepLoading?: boolean;
	onToggleManualStep: (stepId: OnboardingPanelManualStepId) => void;
};

export const OnboardingPanelStepRow = ({
	step,
	isLoadingPanelData,
	isStepLoading = false,
	onToggleManualStep,
}: OnboardingPanelStepRowProps) => {
	const { t } = useTranslate();
	const isLoading = isLoadingPanelData || isStepLoading;

	return (
		<motion.div
			layout
			className='rounded-lg border px-3 py-2'
			transition={{ duration: 0.2 }}
		>
			<div className='flex items-center gap-2'>
				<div className='flex min-w-0 flex-1 items-start gap-2'>
					{step.done ? (
						<motion.span
							initial={{ scale: 0.9, opacity: 0.7 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.18 }}
						>
							<CheckCircle2Icon className='mt-0.5 size-4 text-primary' />
						</motion.span>
					) : (
						<CircleIcon
							className={cn(
								'mt-0.5 size-4 text-muted-foreground',
								isLoading && 'animate-pulse',
							)}
						/>
					)}

					<div className='min-w-0 flex-1 space-y-1'>
						<div className='flex items-center gap-1'>
							<p
								className={cn(
									'truncate text-sm font-medium',
									step.done && 'text-muted-foreground line-through',
								)}
							>
								{step.label}
							</p>

							<Tooltip.Root>
								<Tooltip.Trigger asChild>
									<span className='inline-flex'>
										<CircleHelpIcon className='size-4 text-muted-foreground' />
									</span>
								</Tooltip.Trigger>
								<Tooltip.Content side='top'>{step.description}</Tooltip.Content>
							</Tooltip.Root>
						</div>
					</div>
				</div>

				{step.to &&
					(step.done || isLoading ? (
						<Button
							size='xs'
							variant='secondary'
							isIcon
							isOutlined
							className='self-center'
							disabled
						>
							<ChevronRightIcon />
						</Button>
					) : (
						<Button
							asChild
							size='xs'
							variant='secondary'
							isIcon
							isOutlined
							className='self-center'
							tooltip={t('onboarding.actions.open')}
						>
							{step.id === 'contract' ? (
								<Link
									to='/app/contracts'
									search={(prev) => ({
										...prev,
										isCreating: true,
									})}
								>
									<ChevronRightIcon />
								</Link>
							) : step.id === 'company' ? (
								<Link
									to='/app/settings'
									search={(prev) => ({
										...prev,
										tab: 'company',
										companyAction: 'create',
									})}
								>
									<ChevronRightIcon />
								</Link>
							) : step.id === 'smtp' ? (
								<Link
									to='/app/settings'
									search={(prev) => ({
										...prev,
										tab: 'automations',
										automationResource: 'smtp',
										automationAction: 'create',
									})}
								>
									<ChevronRightIcon />
								</Link>
							) : step.id === 'email-templates' ? (
								<Link
									to='/app/settings'
									search={(prev) => ({
										...prev,
										tab: 'automations',
										automationResource: 'emailTemplate',
										automationAction: 'create',
									})}
								>
									<ChevronRightIcon />
								</Link>
							) : (
								<Link to={step.to}>
									<ChevronRightIcon />
								</Link>
							)}
						</Button>
					))}
			</div>

			{step.manualId && (
				<div className='mt-2 flex items-center gap-2'>
					<Button
						size='xxs'
						variant='secondary'
						isGhost
						disabled={isLoading}
						onClick={() => {
							if (step.manualId) {
								onToggleManualStep(step.manualId);
							}
						}}
					>
						{step.done
							? t('onboarding.actions.markAsNotDone')
							: t('onboarding.actions.markAsDone')}
					</Button>
				</div>
			)}
		</motion.div>
	);
};
