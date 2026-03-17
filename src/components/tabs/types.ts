import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import type * as TabsPrimitive from '@radix-ui/react-tabs';
import type { tabsTriggerVariants } from './consts';

export type TabsRootProps = ComponentProps<typeof TabsPrimitive.Root>;

export type TabsListProps = ComponentProps<typeof TabsPrimitive.List>;

export type TabsTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger> &
	VariantProps<typeof tabsTriggerVariants>;

export type TabsContentProps = ComponentProps<typeof TabsPrimitive.Content>;
