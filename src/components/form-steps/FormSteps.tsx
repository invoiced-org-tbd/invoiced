import { useFormContext } from '@/hooks/use-app-form/useAppForm';
import { getScopedErrorKeys } from '@/hooks/use-app-form/stepErrorUtils';
import { cn } from '@/utils/classNamesUtils';
import { useStore } from '@tanstack/react-form';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Steps, useSteps } from '../steps/Steps';
import type {
	FormStepsContentProps,
	FormStepsListProps,
	FormStepsRootProps,
	FormStepsTriggerProps,
} from './types';

const Root = ({
	searchParamKey = 'step',
	steps,
	defaultValue,
	onValueChange,
	...props
}: FormStepsRootProps) => {
	const navigate = useNavigate();

	const currentStep = useSearch({
		strict: false,
		select: (search) => {
			let resolved: string | undefined;
			type Search = typeof search;
			type SearchKey = keyof Search;

			const value = search[searchParamKey as SearchKey];
			if (value) {
				resolved = String(value);
			}

			return resolved;
		},
	});

	const handleValueChange = (value: string) => {
		onValueChange?.(value);

		if (!value || value === currentStep) {
			return;
		}

		navigate({
			to: '.',
			search: (prev) => ({
				...prev,
				[searchParamKey]: value,
			}),
		});
	};

	const resolvedValue =
		steps?.find((step) => step === currentStep) ??
		defaultValue ??
		steps?.[0] ??
		'';

	return (
		<Steps.Root
			value={resolvedValue}
			onValueChange={handleValueChange}
			steps={steps}
			{...props}
		/>
	);
};

const List = ({ sticky, ...props }: FormStepsListProps) => {
	return (
		<Steps.List
			className={cn(
				sticky
					? 'sticky bg-background z-10 top-0 after:content-[""] after:absolute after:bottom-0 after:left-0 after:block after:h-px after:w-full after:bg-border'
					: 'border-b border-border',
			)}
			{...props}
		/>
	);
};

const Trigger = <TParamsKey extends string = string>(
	props: FormStepsTriggerProps<TParamsKey>,
) => {
	const { value } = props;
	const { currentIndex, preventSkip, getStepIndex } = useSteps();
	const form = useFormContext();
	const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
	const errors = useStore(form.store, (state) => state.errors);

	const scopedErrorKeys = getScopedErrorKeys(errors, value);
	const stepIndex = getStepIndex(value);
	const isUnavailableFutureStep =
		preventSkip &&
		stepIndex !== -1 &&
		(currentIndex === -1 ? stepIndex > 0 : stepIndex > currentIndex);
	const hasErrors = scopedErrorKeys.length > 0 && !isUnavailableFutureStep;

	const isDisabled = isSubmitting || props.disabled;

	return (
		<Steps.Trigger
			{...props}
			variant={hasErrors ? 'error' : 'default'}
			disabled={isDisabled}
		/>
	);
};

const Content = <TParamsKey extends string = string>(
	props: FormStepsContentProps<TParamsKey>,
) => {
	return <Steps.Content {...props} />;
};

export const createFormSteps = <TParamsKey extends string = string>() => {
	return {
		Root,
		List,
		Trigger: Trigger<TParamsKey>,
		Content: Content<TParamsKey>,
	};
};
