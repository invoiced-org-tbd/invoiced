import type { Checkbox as CheckboxPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';
import type { BaseInputProps } from '../base-field/types';

type CheckboxPrimitiveProps = ComponentProps<typeof CheckboxPrimitive.Root>;

export type CheckboxCheckedState = CheckboxPrimitiveProps['checked'];

export type CheckboxProps = BaseInputProps<
	CheckboxCheckedState,
	Omit<CheckboxPrimitiveProps, 'checked' | 'defaultChecked' | 'onCheckedChange'>
>;

export type CheckboxControlProps = {
	id: string;
	className?: string;
	value?: CheckboxCheckedState;
	onChange?: CheckboxProps['onChange'];
	inputProps: Pick<
		ComponentProps<'input'>,
		| 'aria-invalid'
		| 'aria-disabled'
		| 'aria-required'
		| 'aria-readonly'
		| 'disabled'
		| 'required'
		| 'readOnly'
	>;
} & Omit<
	CheckboxProps,
	| 'id'
	| 'className'
	| 'value'
	| 'onChange'
	| 'label'
	| 'description'
	| 'errors'
	| 'showErrors'
	| 'disabled'
	| 'required'
	| 'readOnly'
	| 'buttons'
>;
