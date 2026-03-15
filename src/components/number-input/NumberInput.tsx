import { cn } from '@/lib/utils';
import { useCallback, useEffect, useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { NumericFormat } from 'react-number-format';
import { BaseField } from '../base-field';
import { fieldInputVariants } from '../base-field/consts';
import { getInputButtonsLayout } from '../base-field/utils';
import { useBaseField } from '../base-field/useBaseField';
import type { NumberInputProps } from './types';
import { getNumberInputModeProps } from './utils';

const clampValue = (value: number, min: number, max: number) => {
	return Math.min(Math.max(value, min), max);
};

export const NumberInput = (baseProps: NumberInputProps) => {
	const {
		className,
		label,
		description,
		errors,
		showErrors,
		disabled,
		required,
		readOnly,
		buttons = [],
		style: inputStyle,
		onChange,
		onBlur,
		value: controlledValue,
		defaultValue,
		stepper = 1,
		onKeyDown,
		id: providedId,
		mode = 'integer',
		...props
	} = baseProps;
	const modeProps = getNumberInputModeProps(baseProps);
	const min = Number(modeProps.min ?? Number.NEGATIVE_INFINITY);
	const max = Number(modeProps.max ?? Number.POSITIVE_INFINITY);

	const baseId = useId();
	const id = providedId ?? baseId;

	const [uncontrolledValue, setUncontrolledValue] = useState<
		number | undefined
	>(controlledValue ?? defaultValue);

	useEffect(() => {
		if (controlledValue !== undefined) {
			setUncontrolledValue(controlledValue);
		}
	}, [controlledValue]);

	const value =
		controlledValue !== undefined ? controlledValue : uncontrolledValue;
	const stepAmount = Math.abs(stepper) || 1;

	const { inputProps } = useBaseField({
		errors,
		showErrors,
		disabled,
		required,
		readOnly,
	});

	const syncValue = useCallback(
		(nextValue: number | undefined) => {
			if (controlledValue === undefined) {
				setUncontrolledValue(nextValue);
			}

			onChange?.(nextValue);
		},
		[controlledValue, onChange],
	);

	const handleIncrement = useCallback(() => {
		if (disabled || readOnly) {
			return;
		}

		const nextValue = clampValue(
			value === undefined ? stepAmount : value + stepAmount,
			min,
			max,
		);
		syncValue(nextValue);
	}, [disabled, max, min, readOnly, stepAmount, syncValue, value]);

	const handleDecrement = useCallback(() => {
		if (disabled || readOnly) {
			return;
		}

		const nextValue = clampValue(
			value === undefined ? -stepAmount : value - stepAmount,
			min,
			max,
		);
		syncValue(nextValue);
	}, [disabled, max, min, readOnly, stepAmount, syncValue, value]);

	const { paddingStyle } = getInputButtonsLayout({
		buttons,
	});

	const handleBlur = () => {
		if (value === undefined) {
			onBlur?.();
			return;
		}

		const clampedValue = clampValue(value, min, max);
		if (clampedValue !== value) {
			syncValue(clampedValue);
		}

		onBlur?.();
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			handleIncrement();
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			handleDecrement();
		}

		onKeyDown?.(event);
	};

	return (
		<BaseField.Root>
			<BaseField.Label htmlFor={id}>{label}</BaseField.Label>

			<BaseField.Control>
				<div className='relative w-full'>
					<NumericFormat
						id={id}
						data-slot='input'
						value={value}
						allowNegative={min < 0}
						onValueChange={(values) => {
							syncValue(values.floatValue);
						}}
						className={cn(
							fieldInputVariants({
								height: 'fixed',
								focusMode: 'focusVisible',
							}),
							'placeholder:text-muted-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
							className,
						)}
						style={{ ...paddingStyle, ...inputStyle }}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						{...inputProps}
						{...modeProps}
						{...props}
					/>

					<BaseField.InputButtons
						buttons={buttons}
						side='left'
						disabled={disabled}
						readOnly={readOnly}
					/>
					<BaseField.InputButtons
						buttons={buttons}
						side='right'
						disabled={disabled}
						readOnly={readOnly}
					/>
				</div>
			</BaseField.Control>

			<BaseField.Description>{description}</BaseField.Description>
			<BaseField.Error
				errors={errors}
				showErrors={showErrors}
			/>
		</BaseField.Root>
	);
};
