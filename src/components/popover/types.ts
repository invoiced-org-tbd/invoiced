import type { ComponentProps } from 'react';
import type * as PopoverPrimitive from '@radix-ui/react-popover';

export type PopoverRootProps = ComponentProps<typeof PopoverPrimitive.Root>;

export type PopoverTriggerProps = ComponentProps<
	typeof PopoverPrimitive.Trigger
>;

export type PopoverContentProps = ComponentProps<
	typeof PopoverPrimitive.Content
>;

export type PopoverHeaderProps = ComponentProps<'div'>;

export type PopoverTitleProps = ComponentProps<'h2'>;

export type PopoverDescriptionProps = ComponentProps<'p'>;
