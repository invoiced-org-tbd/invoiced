import { cn } from '@/lib/utils';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { useRef } from 'react';
import { BaseField } from '../base-field';
import { fieldInputVariants } from '../base-field/consts';
import type { InputButton } from '../base-field/types';
import { getInputButtonsLayout } from '../base-field/utils';
import type {
	SelectContentProps,
	SelectEmptyProps,
	SelectGroupProps,
	SelectInputProps,
	SelectItemProps,
	SelectLabelProps,
	SelectListProps,
	SelectRootProps,
	SelectSeparatorProps,
} from './types';

const Root = ({ ...props }: SelectRootProps) => {
	return (
		<ComboboxPrimitive.Root
			data-slot='select'
			{...props}
		/>
	);
};

const SelectChevronIcon = ({ className, ...props }: LucideProps) => {
	return (
		<ChevronDownIcon
			strokeWidth={1.6}
			className={cn('text-foreground/50', className)}
			{...props}
		/>
	);
};

const Input = ({
	className,
	disabled = false,
	buttons = [],
	placeholder = 'Select an option...',
	style: inputStyle,
	...props
}: SelectInputProps) => {
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const defaultTriggerButton: InputButton = {
		side: 'right',
		icon: SelectChevronIcon,
		label: 'Toggle options',
		onClick: () => {
			triggerRef.current?.click();
		},
	};
	const inputButtons = [...buttons, defaultTriggerButton];

	const { paddingStyle } = getInputButtonsLayout({
		buttons: inputButtons,
	});

	return (
		<div
			data-slot='select-input-wrapper'
			className='relative w-fit'
		>
			<ComboboxPrimitive.Input
				data-slot='select-input'
				disabled={disabled}
				className={cn(
					fieldInputVariants({
						height: 'fixed',
						focusMode: 'focus',
					}),
					'data-placeholder:text-muted-foreground',
					className,
				)}
				style={{ ...paddingStyle, ...inputStyle }}
				placeholder={placeholder}
				{...props}
			/>
			<ComboboxPrimitive.Trigger
				ref={triggerRef}
				tabIndex={-1}
				className='sr-only pointer-events-none'
			/>

			<BaseField.InputButtons
				buttons={inputButtons}
				side='left'
				disabled={disabled}
			/>

			<BaseField.InputButtons
				buttons={inputButtons}
				side='right'
				disabled={disabled}
			/>
		</div>
	);
};

const Content = ({
	className,
	side = 'bottom',
	sideOffset = 6,
	align = 'start',
	alignOffset = 0,
	anchor,
	...props
}: SelectContentProps) => {
	return (
		<ComboboxPrimitive.Portal>
			<ComboboxPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				anchor={anchor}
				className='isolate z-50'
			>
				<ComboboxPrimitive.Popup
					data-slot='select-content'
					data-chips={!!anchor}
					className={cn(
						'bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 max-h-72 min-w-36 overflow-hidden rounded-lg shadow-md ring-1 duration-100 relative w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) data-[chips=true]:min-w-(--anchor-width) group/select-content',
						className,
					)}
					{...props}
				/>
			</ComboboxPrimitive.Positioner>
		</ComboboxPrimitive.Portal>
	);
};

const List = ({ className, ...props }: SelectListProps) => {
	return (
		<ComboboxPrimitive.List
			data-slot='select-list'
			className={cn(
				'no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0 overscroll-contain',
				className,
			)}
			{...props}
		/>
	);
};

const Item = ({ className, children, ...props }: SelectItemProps) => {
	return (
		<ComboboxPrimitive.Item
			data-slot='select-item'
			className={cn(
				"data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			{children}
			<ComboboxPrimitive.ItemIndicator
				render={
					<span className='pointer-events-none absolute right-2 flex size-4 items-center justify-center'>
						<CheckIcon className='pointer-events-none' />
					</span>
				}
			/>
		</ComboboxPrimitive.Item>
	);
};

const Group = ({ className, ...props }: SelectGroupProps) => {
	return (
		<ComboboxPrimitive.Group
			data-slot='select-group'
			className={cn(className)}
			{...props}
		/>
	);
};

const Label = ({ className, ...props }: SelectLabelProps) => {
	return (
		<ComboboxPrimitive.GroupLabel
			data-slot='select-label'
			className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
			{...props}
		/>
	);
};

const Separator = ({ className, ...props }: SelectSeparatorProps) => {
	return (
		<ComboboxPrimitive.Separator
			data-slot='select-separator'
			className={cn('bg-border -mx-1 my-1 h-px', className)}
			{...props}
		/>
	);
};

const Empty = ({ className, ...props }: SelectEmptyProps) => {
	return (
		<ComboboxPrimitive.Empty
			data-slot='select-empty'
			className={cn(
				'text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/select-content:flex',
				className,
			)}
			{...props}
		/>
	);
};

export const Select = {
	Root,
	Input,
	Content,
	List,
	Item,
	Group,
	Label,
	Separator,
	Empty,
};
