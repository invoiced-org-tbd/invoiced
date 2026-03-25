import { getContractsQueryOptions } from '@/api/contract/getContracts';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { Tooltip } from '@/components/tooltip/Tooltip';
import { useCompany } from '@/hooks/use-company/useCompany';
import { cn } from '@/utils/classNamesUtils';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import {
	CheckCircle2Icon,
	ChevronDownIcon,
	ChevronRightIcon,
	CircleIcon,
	CircleHelpIcon,
	EyeOffIcon,
	RocketIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { ADVANCED_SETUP_STEPS, CORE_SETUP_STEPS } from './consts';
import type {
	ManualStepId,
	ManualStepsState,
	OnboardingStep,
	OnboardingStepTemplate,
} from './types';

const STORAGE_KEY = 'onboarding-manual-steps-v1';
const DISMISSED_STORAGE_KEY = 'onboarding-checklist-dismissed-v1';
const DEFAULT_MANUAL_STEPS: ManualStepsState = {
	invoiceSent: false,
	smtpSetup: false,
	emailTemplatesSetup: false,
};

const readManualSteps = (): ManualStepsState => {
	if (typeof window === 'undefined') {
		return DEFAULT_MANUAL_STEPS;
	}

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) {
			return DEFAULT_MANUAL_STEPS;
		}

		const parsed = JSON.parse(raw) as Partial<ManualStepsState>;
		return {
			invoiceSent: !!parsed.invoiceSent,
			smtpSetup: !!parsed.smtpSetup,
			emailTemplatesSetup: !!parsed.emailTemplatesSetup,
		};
	} catch {
		return DEFAULT_MANUAL_STEPS;
	}
};

const readDismissedState = (): boolean => {
	if (typeof window === 'undefined') {
		return false;
	}

	return window.localStorage.getItem(DISMISSED_STORAGE_KEY) === 'true';
};

export const OnboardingChecklist = () => {
	const { company } = useCompany();
	const { data: contracts, isFetching } = useQuery(getContractsQueryOptions());
	const [isExpanded, setIsExpanded] = useState(false);
	const [isDismissed, setIsDismissed] = useState(false);
	const [manualSteps, setManualSteps] =
		useState<ManualStepsState>(DEFAULT_MANUAL_STEPS);

	useEffect(() => {
		setManualSteps(readManualSteps());
		setIsDismissed(readDismissedState());
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(manualSteps));
	}, [manualSteps]);

	const getStepDoneState = (step: OnboardingStepTemplate) => {
		if (step.id === 'company') {
			return !!company;
		}

		if (step.id === 'contract') {
			return (contracts?.length ?? 0) > 0;
		}

		if (step.manualId) {
			return manualSteps[step.manualId];
		}

		return false;
	};

	const coreSteps: OnboardingStep[] = CORE_SETUP_STEPS.map((step) => ({
		...step,
		done: getStepDoneState(step),
	}));

	const advancedSteps: OnboardingStep[] = ADVANCED_SETUP_STEPS.map((step) => ({
		...step,
		done: getStepDoneState(step),
	}));

	const allSteps = [...coreSteps, ...advancedSteps];
	const completedCount = allSteps.filter((step) => step.done).length;
	const progress = Math.round((completedCount / allSteps.length) * 100);

	const toggleManualStep = (stepId: ManualStepId) => {
		setManualSteps((current) => ({
			...current,
			[stepId]: !current[stepId],
		}));
	};

	const dismissChecklist = () => {
		setIsDismissed(true);

		if (typeof window !== 'undefined') {
			window.localStorage.setItem(DISMISSED_STORAGE_KEY, 'true');
		}
	};

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
			<Card.Root className='pointer-events-auto overflow-hidden border-border/70 shadow-lg backdrop-blur-sm'>
				<div className='flex items-center gap-2 '>
					<button
						type='button'
						onClick={() => setIsExpanded((current) => !current)}
						className='flex min-w-0 flex-1 items-center gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30  border-b px-4 py-3'
					>
						<RocketIcon className='size-5 text-primary' />
						<div className='min-w-0'>
							<p className='text-sm font-semibold'>Onboarding</p>
							<p className='text-muted-foreground truncate text-xs'>
								{completedCount}/{allSteps.length} completed
							</p>
						</div>

						<motion.div
							className='ml-auto'
							animate={{ rotate: isExpanded ? 0 : 180 }}
							transition={{ duration: 0.2 }}
						>
							<ChevronDownIcon className='size-4 text-muted-foreground shrink-0' />
						</motion.div>

						<Button
							size='xs'
							variant='secondary'
							isGhost
							isIcon
							tooltip='Dismiss onboarding'
							onClick={dismissChecklist}
						>
							<EyeOffIcon />
						</Button>
					</button>
				</div>

				<div className='flex items-center gap-2 px-4 pb-4 pt-3'>
					<div className='bg-muted h-2 w-full overflow-hidden rounded-full'>
						<motion.div
							className='bg-primary h-full transition-[width] duration-300 ease-out'
							animate={{ width: `${progress}%` }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
						/>
					</div>
					<p className='text-muted-foreground text-xs'>{progress}%</p>
				</div>

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
										Core setup
									</p>
									<div className='space-y-2'>
										{coreSteps.map((step) => (
											<ChecklistStepRow
												key={step.id}
												step={step}
												isLoading={step.id === 'contract' && isFetching}
												onToggleManualStep={toggleManualStep}
											/>
										))}
									</div>
								</section>

								<section className='space-y-2'>
									<p className='text-muted-foreground text-xs font-semibold uppercase'>
										Advanced setup
									</p>
									<div className='space-y-2'>
										{advancedSteps.map((step) => (
											<ChecklistStepRow
												key={step.id}
												step={step}
												onToggleManualStep={toggleManualStep}
											/>
										))}
									</div>
								</section>
							</Card.Content>
						</motion.div>
					)}
				</AnimatePresence>
			</Card.Root>
		</motion.div>
	);
};

type ChecklistStepRowProps = {
	step: OnboardingStep;
	isLoading?: boolean;
	onToggleManualStep: (stepId: ManualStepId) => void;
};
const ChecklistStepRow = ({
	step,
	isLoading = false,
	onToggleManualStep,
}: ChecklistStepRowProps) => {
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
							<p className='truncate text-sm font-medium'>{step.label}</p>

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

				{step.to && (
					<Button
						asChild
						size='xs'
						variant='secondary'
						isIcon
						isOutlined
						className='self-center'
						tooltip='Open'
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
						) : (
							<Link to={step.to}>
								<ChevronRightIcon />
							</Link>
						)}
					</Button>
				)}
			</div>

			{step.manualId && (
				<div className='mt-2 flex items-center gap-2'>
					<Button
						size='xxs'
						variant='secondary'
						isGhost
						onClick={() => {
							if (step.manualId) {
								onToggleManualStep(step.manualId);
							}
						}}
					>
						{step.done ? 'Mark as not done' : 'Mark as done'}
					</Button>
				</div>
			)}
		</motion.div>
	);
};
