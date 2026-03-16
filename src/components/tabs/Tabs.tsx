import { cn } from '@/lib/utils';
import {
	Content as TabsContentPrimitive,
	List as TabsListPrimitive,
	Root as TabsRootPrimitive,
	Trigger as TabsTriggerPrimitive,
} from '@radix-ui/react-tabs';
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
				'bg-muted rounded-lg p-[3px] group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col',
				className,
			)}
			{...props}
		/>
	);
};

const Trigger = ({ className, ...props }: TabsTriggerProps) => {
	return (
		<TabsTriggerPrimitive
			data-slot='tabs-trigger'
			className={cn(
				"gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 data-active:bg-background data-active:text-foreground data-active:shadow-sm dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
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
