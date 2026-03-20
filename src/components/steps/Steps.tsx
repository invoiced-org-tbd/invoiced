import { cn } from '@/lib/utils';
import {
	Content as TabsContentPrimitive,
	List as TabsListPrimitive,
	Root as TabsRootPrimitive,
	Trigger as TabsTriggerPrimitive,
} from '@radix-ui/react-tabs';
import { CheckIcon } from 'lucide-react';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	stepsConnectorVariants,
	stepsIndicatorVariants,
	stepsLabelVariants,
	stepsTriggerVariants,
} from './consts';
import type {
	StepsContentProps,
	StepsListProps,
	StepsRootProps,
	StepsState,
	StepsTriggerProps,
} from './types';

type StepsContextValue = {
	currentValue: string | undefined;
	preventSkip: boolean;
	resolvedSteps: string[];
	registerStep: (value: string) => void;
	unregisterStep: (value: string) => void;
	getStepIndex: (value: string) => number;
	setStepVariant: (value: string, variant: 'default' | 'error') => void;
	getStepVariant: (value: string) => 'default' | 'error';
};

const StepsContext = createContext<StepsContextValue | null>(null);

const useStepsContext = () => {
	const context = useContext(StepsContext);

	if (!context) {
		throw new Error('Steps components must be used within Steps.Root');
	}

	return context;
};

const Root = ({
	className,
	value: controlledValue,
	defaultValue,
	onValueChange,
	preventSkip = false,
	steps,
	...props
}: StepsRootProps) => {
	const [internalValue, setInternalValue] = useState(defaultValue ?? '');
	const [orderedSteps, setOrderedSteps] = useState<string[]>([]);
	const [stepVariants, setStepVariants] = useState<
		Record<string, 'default' | 'error'>
	>({});
	const isControlled = controlledValue !== undefined;
	const currentValue = isControlled ? controlledValue : internalValue;
	const resolvedSteps = steps ? [...steps] : orderedSteps;

	const registerStep = useCallback((stepValue: string) => {
		setOrderedSteps((previous) =>
			previous.includes(stepValue) ? previous : [...previous, stepValue],
		);
	}, []);

	const unregisterStep = useCallback((stepValue: string) => {
		setOrderedSteps((previous) =>
			previous.filter((existingStep) => existingStep !== stepValue),
		);
		setStepVariants((previous) => {
			if (!(stepValue in previous)) {
				return previous;
			}

			const next = { ...previous };
			delete next[stepValue];
			return next;
		});
	}, []);

	const getStepIndex = useCallback(
		(stepValue: string) => resolvedSteps.indexOf(stepValue),
		[resolvedSteps],
	);

	const setStepVariant = useCallback(
		(stepValue: string, stepVariant: 'default' | 'error') => {
			setStepVariants((previous) => {
				if (previous[stepValue] === stepVariant) {
					return previous;
				}

				return {
					...previous,
					[stepValue]: stepVariant,
				};
			});
		},
		[],
	);

	const getStepVariant = useCallback(
		(stepValue: string) => stepVariants[stepValue] ?? 'default',
		[stepVariants],
	);

	const canSelectStep = (nextValue: string) => {
		if (!preventSkip) {
			return true;
		}

		const nextIndex = getStepIndex(nextValue);
		if (nextIndex === -1) {
			return false;
		}

		const currentIndex = currentValue ? getStepIndex(currentValue) : -1;
		if (currentIndex === -1) {
			return nextIndex === 0;
		}

		return nextIndex < currentIndex;
	};

	const handleValueChange = (nextValue: string) => {
		if (nextValue === currentValue || !canSelectStep(nextValue)) {
			return;
		}

		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onValueChange?.(nextValue);
	};

	const contextValue = useMemo(
		() => ({
			currentValue,
			preventSkip,
			resolvedSteps,
			registerStep,
			unregisterStep,
			getStepIndex,
			setStepVariant,
			getStepVariant,
		}),
		[
			currentValue,
			preventSkip,
			resolvedSteps,
			registerStep,
			unregisterStep,
			getStepIndex,
			setStepVariant,
			getStepVariant,
		],
	);

	return (
		<StepsContext.Provider value={contextValue}>
			<TabsRootPrimitive
				data-slot='steps'
				data-orientation='horizontal'
				orientation='horizontal'
				className={cn('group/steps flex flex-col gap-2', className)}
				value={currentValue}
				onValueChange={handleValueChange}
				{...props}
			/>
		</StepsContext.Provider>
	);
};

export const useSteps = (): StepsState => {
	const { currentValue, preventSkip, resolvedSteps, getStepIndex } =
		useStepsContext();
	const currentIndex = currentValue ? getStepIndex(currentValue) : -1;
	const nextStep =
		currentIndex >= 0 && currentIndex < resolvedSteps.length - 1
			? resolvedSteps[currentIndex + 1]
			: undefined;
	const previousStep =
		currentIndex > 0 ? resolvedSteps[currentIndex - 1] : undefined;

	return {
		steps: resolvedSteps,
		currentValue,
		preventSkip,
		currentIndex,
		nextStep,
		previousStep,
		isFirstStep: currentIndex <= 0,
		isLastStep: currentIndex >= 0 && currentIndex === resolvedSteps.length - 1,
		isRegisteredStep: (value: string) => getStepIndex(value) !== -1,
		getStepIndex,
	};
};

const List = ({ className, ...props }: StepsListProps) => {
	return (
		<TabsListPrimitive
			data-slot='steps-list'
			className={cn(
				'flex w-full items-start gap-0 overflow-hidden bg-transparent p-0 text-muted-foreground',
				className,
			)}
			{...props}
		/>
	);
};

const Trigger = ({
	className,
	value,
	disabled,
	variant = 'default',
	children,
	...props
}: StepsTriggerProps) => {
	const {
		currentValue,
		preventSkip,
		resolvedSteps,
		registerStep,
		unregisterStep,
		getStepIndex,
		setStepVariant,
		getStepVariant,
	} = useStepsContext();

	useEffect(() => {
		registerStep(value);

		return () => {
			unregisterStep(value);
		};
	}, [registerStep, unregisterStep, value]);

	const currentIndex = currentValue ? getStepIndex(currentValue) : -1;
	const stepIndex = getStepIndex(value);
	const isActive = value === currentValue;
	const isCompleted =
		currentIndex !== -1 && stepIndex !== -1 && stepIndex < currentIndex;
	const isReached =
		currentIndex !== -1 && stepIndex !== -1 && currentIndex >= stepIndex;
	const isFirstStep = stepIndex === 0;
	const isLastStep = stepIndex === resolvedSteps.length - 1;
	const resolvedVariant = variant ?? 'default';
	const isError = resolvedVariant === 'error';
	const previousStepValue = stepIndex > 0 ? resolvedSteps[stepIndex - 1] : undefined;
	const nextStepValue =
		stepIndex >= 0 && stepIndex < resolvedSteps.length - 1
			? resolvedSteps[stepIndex + 1]
			: undefined;
	const previousStepHasError = previousStepValue
		? getStepVariant(previousStepValue) === 'error'
		: false;
	const nextStepHasError = nextStepValue
		? getStepVariant(nextStepValue) === 'error'
		: false;

	useEffect(() => {
		setStepVariant(value, resolvedVariant);
	}, [setStepVariant, resolvedVariant, value]);

	let state: 'active' | 'completed' | 'upcoming' = 'upcoming';
	if (isActive) {
		state = 'active';
	} else if (isCompleted) {
		state = 'completed';
	}

	const isBlockedBySkipGuard =
		preventSkip &&
		stepIndex !== -1 &&
		(currentIndex === -1 ? stepIndex > 0 : stepIndex > currentIndex);

	const visualState = isCompleted
		? 'completed'
		: isActive
			? 'active'
			: 'upcoming';
	const showError = isError;
	const resolvedVisualState =
		showError && visualState === 'completed'
			? 'errorCompleted'
			: showError && visualState === 'active'
				? 'errorActive'
				: showError
					? 'errorUpcoming'
					: visualState;

	return (
		<TabsTriggerPrimitive
			data-slot='steps-trigger'
			data-state={state}
			data-active={isActive}
			data-completed={isCompleted}
			data-variant={variant}
			className={cn(stepsTriggerVariants({ variant }), className)}
			disabled={disabled || isBlockedBySkipGuard}
			value={value}
			{...props}
		>
			<span className='relative flex h-8 w-full items-center justify-center'>
				{!isFirstStep && (
					<span
						aria-hidden
						className={cn(
							stepsConnectorVariants({
								state: isReached
									? previousStepHasError || isError
										? 'error'
										: 'completed'
									: 'upcoming',
							}),
							'left-0 right-[calc(50%+1rem)]',
						)}
					/>
				)}

				{!isLastStep && (
					<span
						aria-hidden
						className={cn(
							stepsConnectorVariants({
								state: isCompleted
									? isError || nextStepHasError
										? 'error'
										: 'completed'
									: 'upcoming',
							}),
							'left-[calc(50%+1rem)] right-0',
						)}
					/>
				)}

				<span
					className={stepsIndicatorVariants({
						state: resolvedVisualState,
					})}
				>
					{isCompleted && !showError ? (
						<CheckIcon className='size-4' />
					) : (
						stepIndex + 1
					)}
				</span>
			</span>

			<span className={stepsLabelVariants({ state: resolvedVisualState })}>
				{children}
			</span>
		</TabsTriggerPrimitive>
	);
};

const Content = ({ className, ...props }: StepsContentProps) => {
	return (
		<TabsContentPrimitive
			data-slot='steps-content'
			className={cn('flex-1 text-sm outline-none', className)}
			{...props}
		/>
	);
};

export const Steps = {
	Root,
	List,
	Trigger,
	Content,
};
