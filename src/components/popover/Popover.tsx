import { cn } from '@/lib/utils';
import {
	Content as PopoverContentPrimitive,
	Portal as PopoverPortal,
	Root as PopoverRootPrimitive,
	Trigger as PopoverTriggerPrimitive,
} from '@radix-ui/react-popover';
import { POPOVER_CONTENT_DEFAULT_SIDE_OFFSET_PX } from './consts';
import type {
	PopoverContentProps,
	PopoverDescriptionProps,
	PopoverHeaderProps,
	PopoverRootProps,
	PopoverTitleProps,
	PopoverTriggerProps,
} from './types';

const Root = ({ ...props }: PopoverRootProps) => {
	return (
		<PopoverRootPrimitive
			data-slot='popover'
			{...props}
		/>
	);
};

const Trigger = ({ ...props }: PopoverTriggerProps) => {
	return (
		<PopoverTriggerPrimitive
			data-slot='popover-trigger'
			{...props}
		/>
	);
};

const Content = ({
	className,
	align = 'center',
	sideOffset = POPOVER_CONTENT_DEFAULT_SIDE_OFFSET_PX,
	...props
}: PopoverContentProps) => {
	return (
		<PopoverPortal>
			<PopoverContentPrimitive
				data-slot='popover-content'
				align={align}
				sideOffset={sideOffset}
				className={cn(
					'bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 flex flex-col gap-2.5 rounded-lg p-2.5 text-sm shadow-md ring-1 duration-100 z-50 w-72 origin-(--radix-popover-content-transform-origin) outline-hidden',
					className,
				)}
				{...props}
			/>
		</PopoverPortal>
	);
};

const Header = ({ className, ...props }: PopoverHeaderProps) => {
	return (
		<div
			data-slot='popover-header'
			className={cn('flex flex-col gap-0.5 text-sm', className)}
			{...props}
		/>
	);
};

const Title = ({ className, ...props }: PopoverTitleProps) => {
	return (
		<h2
			data-slot='popover-title'
			className={cn('font-medium', className)}
			{...props}
		/>
	);
};

const Description = ({ className, ...props }: PopoverDescriptionProps) => {
	return (
		<p
			data-slot='popover-description'
			className={cn('text-muted-foreground', className)}
			{...props}
		/>
	);
};

export const Popover = {
	Root,
	Trigger,
	Content,
	Header,
	Title,
	Description,
};
