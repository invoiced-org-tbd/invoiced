import type { ComponentProps } from 'react';
import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export type DropdownMenuItemVariant = 'default' | 'destructive';

export type DropdownMenuRootProps = ComponentProps<
	typeof DropdownMenuPrimitive.Root
>;

export type DropdownMenuPortalProps = ComponentProps<
	typeof DropdownMenuPrimitive.Portal
>;

export type DropdownMenuTriggerProps = ComponentProps<
	typeof DropdownMenuPrimitive.Trigger
>;

export type DropdownMenuContentProps = ComponentProps<
	typeof DropdownMenuPrimitive.Content
>;

export type DropdownMenuGroupProps = ComponentProps<
	typeof DropdownMenuPrimitive.Group
>;

export type DropdownMenuItemProps = ComponentProps<
	typeof DropdownMenuPrimitive.Item
> & {
	inset?: boolean;
	variant?: DropdownMenuItemVariant;
};

export type DropdownMenuCheckboxItemProps = ComponentProps<
	typeof DropdownMenuPrimitive.CheckboxItem
> & {
	inset?: boolean;
};

export type DropdownMenuRadioGroupProps = ComponentProps<
	typeof DropdownMenuPrimitive.RadioGroup
>;

export type DropdownMenuRadioItemProps = ComponentProps<
	typeof DropdownMenuPrimitive.RadioItem
> & {
	inset?: boolean;
};

export type DropdownMenuLabelProps = ComponentProps<
	typeof DropdownMenuPrimitive.Label
> & {
	inset?: boolean;
};

export type DropdownMenuSeparatorProps = ComponentProps<
	typeof DropdownMenuPrimitive.Separator
>;

export type DropdownMenuShortcutProps = ComponentProps<'span'>;

export type DropdownMenuSubProps = ComponentProps<
	typeof DropdownMenuPrimitive.Sub
>;

export type DropdownMenuSubTriggerProps = ComponentProps<
	typeof DropdownMenuPrimitive.SubTrigger
> & {
	inset?: boolean;
};

export type DropdownMenuSubContentProps = ComponentProps<
	typeof DropdownMenuPrimitive.SubContent
>;
