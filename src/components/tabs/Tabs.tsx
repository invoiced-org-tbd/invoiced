import { cn } from '@/lib/utils';
import {
	Content as TabsContentPrimitive,
	List as TabsListPrimitive,
	Root as TabsRootPrimitive,
	Trigger as TabsTriggerPrimitive,
} from '@radix-ui/react-tabs';
import { tabsTriggerVariants } from './consts';
import type {
	TabsContentProps,
	TabsListProps,
	TabsRootProps,
	TabsTriggerProps,
} from './types';

const Root = ({
	className,
	orientation = 'horizontal',
	...props
}: TabsRootProps) => {
	return (
		<TabsRootPrimitive
			data-slot='tabs'
			data-orientation={orientation}
			orientation={orientation}
			className={cn(
				'gap-2 group/tabs flex data-horizontal:flex-col',
				className,
			)}
			{...props}
		/>
	);
};

const List = ({ className, ...props }: TabsListProps) => {
	return (
		<TabsListPrimitive
			data-slot='tabs-list'
			className={cn(
				'bg-foreground/5 rounded-lg p-[3px] group/tabs-list inline-flex w-full items-center justify-center text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col gap-1',
				className,
			)}
			{...props}
		/>
	);
};

const Trigger = ({
	className,
	variant = 'default',
	...props
}: TabsTriggerProps) => {
	return (
		<TabsTriggerPrimitive
			data-slot='tabs-trigger'
			data-variant={variant}
			className={cn(tabsTriggerVariants({ variant }), className)}
			{...props}
		/>
	);
};

const Content = ({ className, ...props }: TabsContentProps) => {
	return (
		<TabsContentPrimitive
			data-slot='tabs-content'
			className={cn('text-sm flex-1 outline-none', className)}
			{...props}
		/>
	);
};

export const Tabs = {
	Root,
	List,
	Trigger,
	Content,
};
