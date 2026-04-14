import { cn } from '@/utils/classNamesUtils';
import {
	Content as TabsContentPrimitive,
	List as TabsListPrimitive,
	Root as TabsRootPrimitive,
	Trigger as TabsTriggerPrimitive,
} from '@radix-ui/react-tabs';
import { tabsListVariants } from './consts';
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

const List = ({ className, variant = 'default', ...props }: TabsListProps) => {
	return (
		<TabsListPrimitive
			data-slot='tabs-list'
			data-variant={variant}
			className={cn(tabsListVariants({ variant }), className)}
			{...props}
		/>
	);
};

const Trigger = ({ className, ...props }: TabsTriggerProps) => {
	return (
		<TabsTriggerPrimitive
			data-slot='tabs-trigger'
			className={cn(
				"relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent p-3 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				'group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent',
				'data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground',
				'after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100',
				className,
			)}
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
