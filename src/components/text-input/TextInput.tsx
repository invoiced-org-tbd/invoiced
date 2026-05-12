import { cn } from '@/utils/classNamesUtils';
import type { ChangeEvent } from 'react';
import { forwardRef, useId } from 'react';
import { BaseField } from '../base-field/BaseField';
import { fieldInputVariants } from '../base-field/consts';
import { getInputButtonsLayout } from '../base-field/utils';
import { useBaseField } from '../base-field/useBaseField';
import type { TextInputProps } from './types';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	function TextInput(
		{
			className,
			type,
			onChange,
			value,
			label,
			tooltip,
			description,
			errors,
			showErrors,
			disabled,
			required,
			readOnly,
			buttons = [],
			style: inputStyle,
			labelRightSlot,
			...props
		},
		ref,
	) {
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
			const next = event.target.value || '';
			onChange?.(next);
		};
		const { paddingStyle } = getInputButtonsLayout({
			buttons,
		});

		const labelNode = labelRightSlot ? (
			<div className='flex flex-wrap items-end justify-between gap-2'>
				<BaseField.Label
					htmlFor={id}
					required={inputProps.required}
					tooltip={tooltip}
				>
					{label}
				</BaseField.Label>
				{labelRightSlot}
			</div>
		) : (
			<BaseField.Label
				htmlFor={id}
				required={inputProps.required}
				tooltip={tooltip}
			>
				{label}
			</BaseField.Label>
		);

		return (
			<BaseField.Root>
				{labelNode}

				<BaseField.Control>
					<div className='relative w-full'>
						<input
							ref={ref}
							type={type}
							data-slot='input'
							value={value}
							onChange={handleChange}
							className={cn(
								fieldInputVariants({
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
	},
);
