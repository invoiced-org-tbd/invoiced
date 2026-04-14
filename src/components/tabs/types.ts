import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import type * as TabsPrimitive from '@radix-ui/react-tabs';
import type { tabsListVariants } from './consts';

export type TabsRootProps = ComponentProps<typeof TabsPrimitive.Root>;

export type TabsListProps = ComponentProps<typeof TabsPrimitive.List> &
	VariantProps<typeof tabsListVariants>;

export type TabsTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger>;

export type TabsContentProps = ComponentProps<typeof TabsPrimitive.Content>;
