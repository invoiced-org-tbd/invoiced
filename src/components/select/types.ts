import type { Combobox as ComboboxPrimitive } from '@base-ui/react';
import type { ComponentProps } from 'react';
import type { InputButton } from '../base-field/types';

export type SelectRootProps = ComponentProps<typeof ComboboxPrimitive.Root>;

export type SelectInputProps = ComponentProps<
	typeof ComboboxPrimitive.Input
> & {
	buttons?: InputButton[];
};

export type SelectContentProps = ComponentProps<
	typeof ComboboxPrimitive.Popup
> &
	Pick<
		ComponentProps<typeof ComboboxPrimitive.Positioner>,
		'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
	>;

export type SelectListProps = ComponentProps<typeof ComboboxPrimitive.List>;

export type SelectItemProps = ComponentProps<typeof ComboboxPrimitive.Item>;

export type SelectGroupProps = ComponentProps<typeof ComboboxPrimitive.Group>;

export type SelectLabelProps = ComponentProps<
	typeof ComboboxPrimitive.GroupLabel
>;

export type SelectSeparatorProps = ComponentProps<
	typeof ComboboxPrimitive.Separator
>;

export type SelectEmptyProps = ComponentProps<typeof ComboboxPrimitive.Empty>;
