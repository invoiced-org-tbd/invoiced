import { createFormSteps } from '@/components/form-steps/FormSteps';
import type { FormStepsRootProps } from '@/components/form-steps/types';
import { Button } from '@/components/button/Button';
import type { ButtonProps } from '@/components/button/types';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useStore } from '@tanstack/react-form';
import { useNavigate, useSearch } from '@tanstack/react-router';
import type { MouseEvent } from 'react';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { getScopedErrorKeys } from './stepErrorUtils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type FormStepperMode = 'create' | 'edit';

export type FormStepperStep<TStep extends string> = {
	value: TStep;
};

type FormWithStore = {
	store: Parameters<typeof useStore>[0];
	getFieldMeta: (...args: never[]) => { isTouched?: boolean } | undefined;
	SubmitButton: (props: ButtonProps) => ReactNode;
};

type UseFormStepperOptions<
	TStep extends string,
	TForm extends FormWithStore,
> = {
	form: TForm;
	mode: FormStepperMode;
	steps: readonly FormStepperStep<TStep>[];
	/**
	 * @default 'step'
	 */
	searchParamKey?: string;
};

export const useFormStepper = <
	TStep extends string,
	TForm extends FormWithStore,
>({
	form,
	mode,
	steps,
	searchParamKey: searchParamKeyFromHook = 'step',
}: UseFormStepperOptions<TStep, TForm>) => {
	const { t } = useTranslate();
	const navigate = useNavigate();
	const activeStep = useSearch({
		strict: false,
		select: (search) => {
			const value = search[searchParamKeyFromHook as keyof typeof search];
			return value ? String(value) : undefined;
		},
	});

	const baseFormSteps = useMemo(() => createFormSteps<TStep>(), []);
	const stepValues = steps.map((step) => step.value);
	const wrappedRoot = useCallback(
		({ steps, preventSkip, searchParamKey, ...props }: FormStepsRootProps) => {
			return baseFormSteps.Root({
				...props,
				steps: steps ?? stepValues,
				preventSkip: preventSkip ?? mode === 'create',
				searchParamKey: searchParamKey ?? searchParamKeyFromHook,
			});
		},
		[baseFormSteps, mode, stepValues, searchParamKeyFromHook],
	);

	const errors = useStore(form.store, (state) => state.errors);
	const submissionAttempts = useStore(
		form.store,
		(state) => state.submissionAttempts,
	);
	const canSubmit = useStore(form.store, (state) => state.canSubmit);
	const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

	const hasStepErrors = (step: TStep, visibleOnly = false) => {
		const errorKeys = getScopedErrorKeys(errors, step);

		for (const key of errorKeys) {
			if (!visibleOnly) {
				return true;
			}

			type FormFieldMetaPath = Parameters<typeof form.getFieldMeta>[0];
			const isFieldTouched = form.getFieldMeta(
				key as FormFieldMetaPath,
			)?.isTouched;
			const showFieldErrors =
				!!isFieldTouched || submissionAttempts > 0 || !canSubmit;
			if (showFieldErrors) {
				return true;
			}
		}

		return false;
	};

	const currentStep =
		stepValues.find((stepValue) => stepValue === activeStep) ?? stepValues[0];
	const hasAppliedCreateEntryGuard = useRef(false);
	useEffect(() => {
		if (mode !== 'create' || hasAppliedCreateEntryGuard.current) {
			return;
		}

		hasAppliedCreateEntryGuard.current = true;
		if (activeStep && activeStep !== stepValues[0]) {
			navigate({
				to: '.',
				search: (prev) => ({
					...prev,
					[searchParamKeyFromHook]: stepValues[0],
				}),
			});
		}
	}, [activeStep, mode, navigate, searchParamKeyFromHook, stepValues]);

	const currentIndex = stepValues.indexOf(currentStep);
	const isLastStep = currentIndex === stepValues.length - 1;
	const nextStep =
		currentIndex >= 0 && currentIndex < stepValues.length - 1
			? stepValues[currentIndex + 1]
			: undefined;
	const previousStep =
		currentIndex > 0 ? stepValues[currentIndex - 1] : undefined;

	const goToStep = useCallback(
		(step: TStep | undefined) => {
			if (!step) {
				return;
			}

			navigate({
				to: '.',
				search: (prev) => ({
					...prev,
					[searchParamKeyFromHook]: step,
				}),
			});
		},
		[navigate, searchParamKeyFromHook],
	);
	const canGoNext =
		!!nextStep && (mode === 'edit' || !hasStepErrors(currentStep));

	const PreviousButton = useCallback(
		({ onClick, disabled, children, ...props }: ButtonProps) => {
			if (!previousStep) {
				return null;
			}

			const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
				onClick?.(event);
				if (event.defaultPrevented) {
					return;
				}
				goToStep(previousStep);
			};

			return Button({
				type: 'button',
				variant: 'secondary',
				children: children ?? <ChevronLeftIcon />,
				tooltip: t('common.goBack'),
				size: 'xs',
				isIcon: true,
				...props,
				disabled: disabled || isSubmitting,
				onClick: handleClick,
			});
		},
		[goToStep, isSubmitting, previousStep, t],
	);
	const NextButton = useCallback(
		({ onClick, disabled, children, ...props }: ButtonProps) => {
			if (isLastStep) {
				return null;
			}

			const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
				onClick?.(event);
				if (event.defaultPrevented) {
					return;
				}
				goToStep(nextStep);
			};

			return Button({
				type: 'button',
				variant: mode === 'edit' ? 'secondary' : undefined,
				children: children ?? (
					<span className='flex items-center'>
						{mode === 'edit' ? null : t('common.next')}
						<ChevronRightIcon />
					</span>
				),
				tooltip: t('common.next'),
				size: mode === 'edit' ? 'xs' : undefined,
				isIcon: mode === 'edit',
				...props,
				disabled: disabled || !canGoNext || isSubmitting,
				onClick: handleClick,
			});
		},
		[canGoNext, goToStep, isLastStep, isSubmitting, mode, nextStep, t],
	);
	const SubmitButton = useCallback(
		({ disabled, ...props }: ButtonProps) => {
			if (!(mode === 'edit' || isLastStep)) {
				return null;
			}

			return form.SubmitButton({
				...props,
				disabled: disabled || !canSubmit,
			});
		},
		[canSubmit, form, isLastStep, mode],
	);

	const FormSteps = useMemo(
		() => ({
			...baseFormSteps,
			Root: wrappedRoot,
			PreviousButton,
			NextButton,
			SubmitButton,
		}),
		[NextButton, PreviousButton, SubmitButton, baseFormSteps, wrappedRoot],
	);

	return {
		FormSteps,
		currentStep,
		stepValues,
		nextStep,
		previousStep,
		isLastStep,
		canGoNext,
		goToStep,
		hasStepErrors,
	};
};
