import type {
	StepsContentProps,
	StepsListProps,
	StepsRootProps,
	StepsTriggerProps,
} from '../steps/types';

export type FormStepsRootProps = StepsRootProps & {
	/**
	 * @default 'step'
	 */
	searchParamKey?: string;
};

export type FormStepsListProps = StepsListProps & {
	sticky?: boolean;
};

export type FormStepsTriggerProps<TParamsKey extends string = string> =
	StepsTriggerProps & {
		value: TParamsKey;
	};

export type FormStepsContentProps<TParamsKey extends string = string> =
	StepsContentProps & {
		value: TParamsKey;
	};
