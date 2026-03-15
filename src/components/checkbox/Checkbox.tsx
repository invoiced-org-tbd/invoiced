import { CheckIcon } from 'lucide-react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { useId } from 'react';
import { BaseField } from '../base-field';
import { toggleControlVariants } from '../base-field';
import { useBaseField } from '../base-field/useBaseField';
import { cn } from '@/lib/utils';
import type { CheckboxControlProps, CheckboxProps } from './types';

const CheckboxControl = ({
	id,
	className,
	value,
	onChange,
	inputProps,
	...props
}: CheckboxControlProps) => {
	return (
		<CheckboxPrimitive.Root
			id={id}
			data-slot='checkbox'
			className={cn(
				toggleControlVariants({
					disabledSelector: 'native',
					shape: 'square',
					size: 'checkbox',
				}),
				'border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary bg-transparent transition-colors group-has-disabled/field:opacity-50',
				className,
			)}
			checked={value}
			onCheckedChange={(nextValue) => onChange?.(nextValue)}
			{...inputProps}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot='checkbox-indicator'
				className='[&>svg]:size-3.5 grid place-content-center text-current transition-none'
			>
				<CheckIcon />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
};

export const Checkbox = ({
	className,
	value,
	onChange,
	label,
	description,
	errors,
	showErrors,
	disabled,
	required,
	readOnly,
	id: propId,
	buttons: _buttons,
	...props
}: CheckboxProps) => {
	const baseId = useId();
	const id = propId ?? baseId;

	const { inputProps } = useBaseField({
		errors,
		showErrors,
		disabled,
		required,
		readOnly,
	});
	const hasFieldContent =
		!!label || !!description || (!!showErrors && !!errors?.length);
	const checkboxControl = (
		<CheckboxControl
			id={id}
			className={className}
			value={value}
			onChange={onChange}
			inputProps={inputProps}
			{...props}
		/>
	);
	const checkboxLoadingSkeleton = (
		<div
			data-slot='checkbox-skeleton'
			aria-hidden='true'
			className='bg-muted animate-pulse size-4 rounded-[4px]'
		/>
	);

	if (!hasFieldContent) {
		return (
			<BaseField.Control
				loadingVariant='custom'
				className='w-auto'
				renderLoading={checkboxLoadingSkeleton}
			>
				{checkboxControl}
			</BaseField.Control>
		);
	}

	return (
		<BaseField.Root>
			<div className='flex items-center gap-2'>
				<BaseField.Control
					loadingVariant='custom'
					className='w-auto'
					renderLoading={checkboxLoadingSkeleton}
				>
					{checkboxControl}
				</BaseField.Control>

				<BaseField.Label
					htmlFor={id}
					className='w-auto'
				>
					{label}
				</BaseField.Label>
			</div>

			<BaseField.Description>{description}</BaseField.Description>
			<BaseField.Error
				errors={errors}
				showErrors={showErrors}
			/>
		</BaseField.Root>
	);
};
