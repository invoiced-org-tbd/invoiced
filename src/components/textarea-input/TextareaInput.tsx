import { cn } from '@/utils/classNamesUtils';
import type { ChangeEvent, ComponentProps } from 'react';
import { useId } from 'react';
import { BaseField } from '../base-field/BaseField';
import { fieldInputVariants } from '../base-field/consts';
import { useBaseField } from '../base-field/useBaseField';
import type { BaseInputProps } from '../base-field/types';

export type TextareaInputProps = BaseInputProps<
	string,
	ComponentProps<'textarea'>
>;

export const TextareaInput = ({
	className,
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
	...props
}: TextareaInputProps) => {
	const baseId = useId();
	const id = props.id ?? baseId;

	const { inputProps } = useBaseField({
		errors,
		showErrors,
		disabled,
		required,
		readOnly,
	});

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		onChange?.(event.target.value || '');
	};

	return (
		<BaseField.Root>
			<BaseField.Label
				htmlFor={id}
				required={inputProps.required}
				tooltip={tooltip}
			>
				{label}
			</BaseField.Label>

			<BaseField.Control>
				<textarea
					data-slot='input'
					value={value}
					onChange={handleChange}
					className={cn(
						fieldInputVariants({
							focusMode: 'focusVisible',
						}),
						'placeholder:text-muted-foreground min-h-32 resize-y py-2',
						className,
					)}
					{...inputProps}
					{...props}
					id={id}
				/>
			</BaseField.Control>

			<BaseField.Description>{description}</BaseField.Description>
			<BaseField.Error
				errors={errors}
				showErrors={showErrors}
			/>
		</BaseField.Root>
	);
};
