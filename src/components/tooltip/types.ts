import type { Tooltip as TooltipPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';

export type TooltipProviderProps = ComponentProps<
	typeof TooltipPrimitive.Provider
>;

export type TooltipRootProps = ComponentProps<typeof TooltipPrimitive.Root>;

export type TooltipTriggerProps = ComponentProps<
	typeof TooltipPrimitive.Trigger
>;

export type TooltipContentProps = ComponentProps<
	typeof TooltipPrimitive.Content
>;
