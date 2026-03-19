import type { ComponentProps } from 'react';
import type * as TabsPrimitive from '@radix-ui/react-tabs';
import type { VariantProps } from 'class-variance-authority';
import type { stepsTriggerVariants } from './consts';

export type StepsRootProps = Omit<
	ComponentProps<typeof TabsPrimitive.Root>,
	'orientation'
> & {
	/**
	 * Prevent selecting future steps through trigger clicks.
	 * Useful for form flows where forward movement is controlled programmatically.
	 *
	 * @default false
	 */
	preventSkip?: boolean;
	/**
	 * Optional explicit step order. When provided, navigation metadata
	 * and skip-guard checks use this order instead of trigger registration order.
	 */
	steps?: readonly string[];
};

export type StepsListProps = ComponentProps<typeof TabsPrimitive.List>;

export type StepsTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger> &
	VariantProps<typeof stepsTriggerVariants>;

export type StepsContentProps = ComponentProps<typeof TabsPrimitive.Content>;

export type StepsState = {
	steps: string[];
	currentValue: string | undefined;
	preventSkip: boolean;
	currentIndex: number;
	nextStep: string | undefined;
	previousStep: string | undefined;
	isFirstStep: boolean;
	isLastStep: boolean;
	isRegisteredStep: (value: string) => boolean;
	getStepIndex: (value: string) => number;
};
