import { cn } from '@/lib/utils';
import {
	CheckboxItem as DropdownMenuCheckboxItemPrimitive,
	Content as DropdownMenuContentPrimitive,
	Group as DropdownMenuGroupPrimitive,
	Item as DropdownMenuItemPrimitive,
	ItemIndicator as DropdownMenuItemIndicatorPrimitive,
	Label as DropdownMenuLabelPrimitive,
	Portal as DropdownMenuPortalPrimitive,
	RadioGroup as DropdownMenuRadioGroupPrimitive,
	RadioItem as DropdownMenuRadioItemPrimitive,
	Root as DropdownMenuRootPrimitive,
	Separator as DropdownMenuSeparatorPrimitive,
	Sub as DropdownMenuSubPrimitive,
	SubContent as DropdownMenuSubContentPrimitive,
	SubTrigger as DropdownMenuSubTriggerPrimitive,
	Trigger as DropdownMenuTriggerPrimitive,
} from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon } from 'lucide-react';
import {
	DROPDOWN_MENU_CONTENT_DEFAULT_ALIGN,
	DROPDOWN_MENU_CONTENT_DEFAULT_SIDE_OFFSET_PX,
} from './consts';
import type {
	DropdownMenuCheckboxItemProps,
	DropdownMenuContentProps,
	DropdownMenuGroupProps,
	DropdownMenuItemProps,
	DropdownMenuLabelProps,
	DropdownMenuPortalProps,
	DropdownMenuRadioGroupProps,
	DropdownMenuRadioItemProps,
	DropdownMenuRootProps,
	DropdownMenuSeparatorProps,
	DropdownMenuShortcutProps,
	DropdownMenuSubContentProps,
	DropdownMenuSubProps,
	DropdownMenuSubTriggerProps,
	DropdownMenuTriggerProps,
} from './types';

const Root = ({ ...props }: DropdownMenuRootProps) => {
	return (
		<DropdownMenuRootPrimitive
			data-slot='dropdown-menu'
			{...props}
		/>
	);
};

const Portal = ({ ...props }: DropdownMenuPortalProps) => {
	return (
		<DropdownMenuPortalPrimitive
			data-slot='dropdown-menu-portal'
			{...props}
		/>
	);
};

const Trigger = ({ ...props }: DropdownMenuTriggerProps) => {
	return (
		<DropdownMenuTriggerPrimitive
			data-slot='dropdown-menu-trigger'
			{...props}
		/>
	);
};

const Content = ({
	className,
	align = DROPDOWN_MENU_CONTENT_DEFAULT_ALIGN,
	sideOffset = DROPDOWN_MENU_CONTENT_DEFAULT_SIDE_OFFSET_PX,
	...props
}: DropdownMenuContentProps) => {
	return (
		<Portal>
			<DropdownMenuContentPrimitive
				data-slot='dropdown-menu-content'
				sideOffset={sideOffset}
				align={align}
				className={cn(
					'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-lg p-1 shadow-md ring-1 duration-100 z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto data-[state=closed]:overflow-hidden',
					className,
				)}
				{...props}
			/>
		</Portal>
	);
};

const Group = ({ ...props }: DropdownMenuGroupProps) => {
	return (
		<DropdownMenuGroupPrimitive
			data-slot='dropdown-menu-group'
			{...props}
		/>
	);
};

const Item = ({
	className,
	inset,
	variant = 'default',
	...props
}: DropdownMenuItemProps) => {
	return (
		<DropdownMenuItemPrimitive
			data-slot='dropdown-menu-item'
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		/>
	);
};

const CheckboxItem = ({
	className,
	children,
	inset,
	...props
}: DropdownMenuCheckboxItemProps) => {
	return (
		<DropdownMenuCheckboxItemPrimitive
			data-slot='dropdown-menu-checkbox-item'
			data-inset={inset}
			className={cn(
				"focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			<span
				className='absolute right-2 flex items-center justify-center pointer-events-none'
				data-slot='dropdown-menu-checkbox-item-indicator'
			>
				<DropdownMenuItemIndicatorPrimitive>
					<CheckIcon />
				</DropdownMenuItemIndicatorPrimitive>
			</span>
			{children}
		</DropdownMenuCheckboxItemPrimitive>
	);
};

const RadioGroup = ({ ...props }: DropdownMenuRadioGroupProps) => {
	return (
		<DropdownMenuRadioGroupPrimitive
			data-slot='dropdown-menu-radio-group'
			{...props}
		/>
	);
};

const RadioItem = ({
	className,
	children,
	inset,
	...props
}: DropdownMenuRadioItemProps) => {
	return (
		<DropdownMenuRadioItemPrimitive
			data-slot='dropdown-menu-radio-item'
			data-inset={inset}
			className={cn(
				"focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			<span
				className='absolute right-2 flex items-center justify-center pointer-events-none'
				data-slot='dropdown-menu-radio-item-indicator'
			>
				<DropdownMenuItemIndicatorPrimitive>
					<CheckIcon />
				</DropdownMenuItemIndicatorPrimitive>
			</span>
			{children}
		</DropdownMenuRadioItemPrimitive>
	);
};

const Label = ({ className, inset, ...props }: DropdownMenuLabelProps) => {
	return (
		<DropdownMenuLabelPrimitive
			data-slot='dropdown-menu-label'
			data-inset={inset}
			className={cn(
				'text-muted-foreground px-1.5 py-1 text-xs font-medium data-inset:pl-7',
				className,
			)}
			{...props}
		/>
	);
};

const Separator = ({ className, ...props }: DropdownMenuSeparatorProps) => {
	return (
		<DropdownMenuSeparatorPrimitive
			data-slot='dropdown-menu-separator'
			className={cn('bg-border -mx-1 my-1 h-px', className)}
			{...props}
		/>
	);
};

const Shortcut = ({ className, ...props }: DropdownMenuShortcutProps) => {
	return (
		<span
			data-slot='dropdown-menu-shortcut'
			className={cn(
				'text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest',
				className,
			)}
			{...props}
		/>
	);
};

const Sub = ({ ...props }: DropdownMenuSubProps) => {
	return (
		<DropdownMenuSubPrimitive
			data-slot='dropdown-menu-sub'
			{...props}
		/>
	);
};

const SubTrigger = ({
	className,
	inset,
	children,
	...props
}: DropdownMenuSubTriggerProps) => {
	return (
		<DropdownMenuSubTriggerPrimitive
			data-slot='dropdown-menu-sub-trigger'
			data-inset={inset}
			className={cn(
				"focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7 [&_svg:not([class*='size-'])]:size-4 flex cursor-default items-center outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className='cn-rtl-flip ml-auto' />
		</DropdownMenuSubTriggerPrimitive>
	);
};

const SubContent = ({ className, ...props }: DropdownMenuSubContentProps) => {
	return (
		<DropdownMenuSubContentPrimitive
			data-slot='dropdown-menu-sub-content'
			className={cn(
				'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-[96px] rounded-lg p-1 shadow-lg ring-1 duration-100 z-50 origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden',
				className,
			)}
			{...props}
		/>
	);
};

export const DropdownMenu = {
	Root,
	Portal,
	Trigger,
	Content,
	Group,
	Item,
	CheckboxItem,
	RadioGroup,
	RadioItem,
	Label,
	Separator,
	Shortcut,
	Sub,
	SubTrigger,
	SubContent,
};
