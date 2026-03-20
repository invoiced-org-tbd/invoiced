export type StepsTriggerState = 'active' | 'completed' | 'upcoming';

export type StepsVisualState =
	| 'completed'
	| 'active'
	| 'upcoming'
	| 'errorCompleted'
	| 'errorActive'
	| 'errorUpcoming';

export type StepsConnectorState = 'completed' | 'error' | 'upcoming';

type GetStepMetaInput = {
	currentValue: string | undefined;
	value: string;
	resolvedSteps: string[];
	getStepIndex: (value: string) => number;
};

export const getStepsCurrentIndex = ({
	currentValue,
	getStepIndex,
}: Pick<GetStepMetaInput, 'currentValue' | 'getStepIndex'>): number => {
	return currentValue ? getStepIndex(currentValue) : -1;
};

export const getStepsMeta = ({
	currentValue,
	value,
	resolvedSteps,
	getStepIndex,
}: GetStepMetaInput) => {
	const currentIndex = getStepsCurrentIndex({ currentValue, getStepIndex });
	const stepIndex = getStepIndex(value);
	const isActive = value === currentValue;
	const isCompleted =
		currentIndex !== -1 && stepIndex !== -1 && stepIndex < currentIndex;
	const isReached =
		currentIndex !== -1 && stepIndex !== -1 && currentIndex >= stepIndex;
	const isFirstStep = stepIndex === 0;
	const isLastStep = stepIndex === resolvedSteps.length - 1;
	const previousStepValue =
		stepIndex > 0 ? resolvedSteps[stepIndex - 1] : undefined;
	const nextStepValue =
		stepIndex >= 0 && stepIndex < resolvedSteps.length - 1
			? resolvedSteps[stepIndex + 1]
			: undefined;

	return {
		currentIndex,
		stepIndex,
		isActive,
		isCompleted,
		isReached,
		isFirstStep,
		isLastStep,
		previousStepValue,
		nextStepValue,
	};
};

type StepSelectionGuardInput = {
	preventSkip: boolean;
	stepIndex: number;
	currentIndex: number;
};

export const getStepsIsStepBlockedBySkipGuard = ({
	preventSkip,
	stepIndex,
	currentIndex,
}: StepSelectionGuardInput): boolean => {
	return (
		preventSkip &&
		stepIndex !== -1 &&
		(currentIndex === -1 ? stepIndex > 0 : stepIndex > currentIndex)
	);
};

type CanSelectStepInput = {
	preventSkip: boolean;
	nextValue: string;
	currentValue: string | undefined;
	getStepIndex: (value: string) => number;
};

export const getStepsCanSelectStep = ({
	preventSkip,
	nextValue,
	currentValue,
	getStepIndex,
}: CanSelectStepInput): boolean => {
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

export const getStepsTriggerState = ({
	isActive,
	isCompleted,
}: {
	isActive: boolean;
	isCompleted: boolean;
}): StepsTriggerState => {
	if (isActive) {
		return 'active';
	}

	if (isCompleted) {
		return 'completed';
	}

	return 'upcoming';
};

export const getStepsResolvedVisualState = ({
	isActive,
	isCompleted,
	isError,
}: {
	isActive: boolean;
	isCompleted: boolean;
	isError: boolean;
}): StepsVisualState => {
	if (isCompleted) {
		return isError ? 'errorCompleted' : 'completed';
	}

	if (isActive) {
		return isError ? 'errorActive' : 'active';
	}

	return isError ? 'errorUpcoming' : 'upcoming';
};

export const getStepsPreviousConnectorState = ({
	isReached,
	previousStepHasError,
	isError,
}: {
	isReached: boolean;
	previousStepHasError: boolean;
	isError: boolean;
}): StepsConnectorState => {
	if (!isReached) {
		return 'upcoming';
	}

	return previousStepHasError || isError ? 'error' : 'completed';
};

export const getStepsNextConnectorState = ({
	isCompleted,
	nextStepHasError,
	isError,
}: {
	isCompleted: boolean;
	nextStepHasError: boolean;
	isError: boolean;
}): StepsConnectorState => {
	if (!isCompleted) {
		return 'upcoming';
	}

	return isError || nextStepHasError ? 'error' : 'completed';
};
