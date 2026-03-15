import { cn } from '@/lib/utils';
import type { ChangeEvent } from 'react';
import { useId } from 'react';
import { BaseField } from '../base-field';
import { fieldInputVariants } from '../base-field/consts';
import { getInputButtonsLayout } from '../base-field/utils';
import { useBaseField } from '../base-field/useBaseField';
import type { TextInputProps } from './types';

export const TextInput = ({
	className,
	type,
	onChange,
	value,
	label,
	description,
	errors,
	showErrors,
	disabled,
	required,
	readOnly,
	buttons = [],
	style: inputStyle,
	...props
}: TextInputProps) => {
	const baseId = useId();
	const id = props.id ?? baseId;

	const { inputProps } = useBaseField({
		errors,
		showErrors,
		disabled,
		required,
		readOnly,
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value || '';
		onChange?.(value);
	};
	const { paddingStyle } = getInputButtonsLayout({
		buttons,
	});

	return (
		<BaseField.Root>
			<BaseField.Label htmlFor={id}>{label}</BaseField.Label>

			<BaseField.Control>
				<div className='relative w-full'>
					<input
						type={type}
						data-slot='input'
						value={value}
						onChange={handleChange}
						className={cn(
							fieldInputVariants({
								height: 'fixed',
								focusMode: 'focusVisible',
							}),
							'placeholder:text-muted-foreground',
							className,
						)}
						style={{ ...paddingStyle, ...inputStyle }}
						{...inputProps}
						{...props}
						id={id}
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
