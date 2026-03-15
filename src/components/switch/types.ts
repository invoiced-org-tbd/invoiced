import type { Switch as SwitchPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';
import type { BaseInputProps } from '../base-field/types';

type SwitchPrimitiveProps = ComponentProps<typeof SwitchPrimitive.Root>;

export type SwitchCheckedState = SwitchPrimitiveProps['checked'];

export type SwitchProps = BaseInputProps<
	SwitchCheckedState,
	Omit<SwitchPrimitiveProps, 'checked' | 'defaultChecked' | 'onCheckedChange'>
>;
