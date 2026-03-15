import { Switch as SwitchPrimitive } from 'radix-ui';
import { useId } from 'react';
import { BaseField } from '../base-field';
import { toggleControlVariants } from '../base-field';
import { useBaseField } from '../base-field/useBaseField';
import { cn } from '@/lib/utils';
import type { SwitchProps } from './types';

export const Switch = ({
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
}: SwitchProps) => {
	const baseId = useId();
	const id = propId ?? baseId;

	const { inputProps } = useBaseField({
		errors,
		showErrors,
		disabled,
		required,
		readOnly,
	});
	const handleCheckedChange: SwitchProps['onChange'] = (nextValue) => {
		onChange?.(nextValue);
	};
	const hasFieldContent =
		!!label || !!description || (!!showErrors && !!errors?.length);
	const switchControl = (
		<SwitchPrimitive.Root
			id={id}
			data-slot='switch'
			className={cn(
				toggleControlVariants({
					disabledSelector: 'data',
					shape: 'pill',
					size: 'switch',
				}),
				'data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-unchecked:border-input border-transparent transition-all',
				className,
			)}
			checked={value}
			onCheckedChange={handleCheckedChange}
			{...inputProps}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot='switch-thumb'
				className='bg-background dark:data-unchecked:bg-foreground dark:data-checked:bg-primary-foreground rounded-full size-4 data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0 pointer-events-none block ring-0 transition-transform'
			/>
		</SwitchPrimitive.Root>
	);
	const switchLoadingSkeleton = (
		<div
			data-slot='switch-skeleton'
			aria-hidden='true'
			className='bg-muted animate-pulse h-[18.4px] w-[32px] rounded-full'
		/>
	);

	if (!hasFieldContent) {
		return (
			<BaseField.Control
				loadingVariant='custom'
				className='w-auto'
				renderLoading={switchLoadingSkeleton}
			>
				{switchControl}
			</BaseField.Control>
		);
	}

	return (
		<BaseField.Root>
			<div className='flex items-center gap-2'>
				<BaseField.Control
					loadingVariant='custom'
					className='w-auto'
					renderLoading={switchLoadingSkeleton}
				>
					{switchControl}
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
