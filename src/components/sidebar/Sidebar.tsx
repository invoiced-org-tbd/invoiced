import { Button } from '@/components/button/Button';
import { Tooltip } from '@/components/tooltip/Tooltip';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { cn } from '@/utils/classNamesUtils';
import { Slot } from '@radix-ui/react-slot';
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';
import {
	SIDEBAR_WIDTH,
	SIDEBAR_WIDTH_ICON,
	sidebarMenuButtonVariants,
} from './consts';
import type {
	SidebarContentProps,
	SidebarGroupContentProps,
	SidebarGroupLabelProps,
	SidebarGroupProps,
	SidebarInsetProps,
	SidebarMenuButtonProps,
	SidebarMenuItemProps,
	SidebarMenuProps,
	SidebarPanelProps,
	SidebarRootProps,
	SidebarTriggerProps,
} from './types';
import { useSidebar } from './useSidebar';

const Root = ({
	inset = false,
	className,
	style,
	children,
	...props
}: SidebarRootProps) => {
	return (
		<div
			data-slot='sidebar-wrapper'
			data-inset={inset}
			style={
				{
					'--sidebar-width': SIDEBAR_WIDTH,
					'--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
					...style,
				} as React.CSSProperties
			}
			className={cn(
				'group/sidebar-wrapper flex min-h-svh w-full',
				inset && 'md:bg-sidebar md:gap-2 md:p-2',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

const Panel = ({
	collapsible = 'icon',
	className,
	children,
	...props
}: SidebarPanelProps) => {
	const open = useSidebar((s) => s.open);
	const state = open ? 'expanded' : 'collapsed';
	const isCollapsible = collapsible !== false;

	return (
		<div
			className='group peer text-sidebar-foreground'
			data-state={state}
			data-collapsible={
				isCollapsible && state === 'collapsed' ? collapsible : undefined
			}
			data-slot='sidebar'
		>
			<div
				data-slot='sidebar-gap'
				className={cn(
					'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
					isCollapsible &&
						'group-data-[collapsible=offcanvas]:w-0 group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
				)}
			/>
			<div
				data-slot='sidebar-container'
				className={cn(
					'fixed inset-y-0 left-0 z-10 flex w-(--sidebar-width) rounded-xl bg-sidebar text-sidebar-foreground transition-[left,width] duration-200 ease-linear',
					'group-data-[inset=true]/sidebar-wrapper:left-2 group-data-[inset=true]/sidebar-wrapper:bottom-2 group-data-[inset=true]/sidebar-wrapper:top-2',
					isCollapsible &&
						'group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
					'overflow-hidden',
					className,
				)}
				{...props}
			>
				<div
					data-slot='sidebar-inner'
					className='flex flex-col size-full'
				>
					{children}
				</div>
			</div>
		</div>
	);
};

const Inset = ({ className, ...props }: SidebarInsetProps) => {
	return (
		<main
			data-slot='sidebar-inset'
			className={cn(
				'relative flex min-h-0 min-w-0 flex-1 flex-col bg-background',
				'group-data-[inset=true]/sidebar-wrapper:overflow-hidden group-data-[inset=true]/sidebar-wrapper:rounded-xl group-data-[inset=true]/sidebar-wrapper:border group-data-[inset=true]/sidebar-wrapper:border-sidebar-border group-data-[inset=true]/sidebar-wrapper:shadow-xs',
				className,
			)}
			{...props}
		/>
	);
};

const Content = ({ className, ...props }: SidebarContentProps) => {
	return (
		<div
			data-slot='sidebar-content'
			data-sidebar='content'
			className={cn(
				'no-scrollbar flex min-h-0 flex-1  flex-col gap-1 overflow-auto p-2 group-data-[collapsible=icon]:overflow-hidden',
				className,
			)}
			{...props}
		/>
	);
};

const Group = ({ className, ...props }: SidebarGroupProps) => {
	return (
		<div
			data-slot='sidebar-group'
			data-sidebar='group'
			className={cn('relative flex w-full min-w-0 flex-col py-1', className)}
			{...props}
		/>
	);
};

const GroupLabel = ({
	className,
	asChild = false,
	...props
}: SidebarGroupLabelProps) => {
	const Comp = asChild ? Slot : 'div';

	return (
		<Comp
			data-slot='sidebar-group-label'
			data-sidebar='group-label'
			className={cn(
				'text-sidebar-foreground/70 h-8 px-2 text-xs font-medium max-md:hidden [&>svg]:size-4 [&>svg]:shrink-0 group-data-[state=collapsed]:hidden',
				className,
			)}
			{...props}
		/>
	);
};

const GroupContent = ({ className, ...props }: SidebarGroupContentProps) => {
	return (
		<div
			data-slot='sidebar-group-content'
			data-sidebar='group-content'
			className={cn('w-full text-sm', className)}
			{...props}
		/>
	);
};

const Menu = ({ className, ...props }: SidebarMenuProps) => {
	return (
		<ul
			data-slot='sidebar-menu'
			data-sidebar='menu'
			className={cn('flex w-full min-w-0 flex-col gap-1', className)}
			{...props}
		/>
	);
};

const MenuItem = ({ className, ...props }: SidebarMenuItemProps) => {
	return (
		<li
			data-slot='sidebar-menu-item'
			data-sidebar='menu-item'
			className={cn('group/menu-item relative', className)}
			{...props}
		/>
	);
};

const MenuButton = ({
	asChild = false,
	isActive = false,
	variant = 'default',
	size = 'default',
	tooltip,
	className,
	...props
}: SidebarMenuButtonProps) => {
	const Comp = asChild ? Slot : 'button';
	const open = useSidebar((s) => s.open);

	const menuButton = (
		<Comp
			data-slot='sidebar-menu-button'
			data-sidebar='menu-button'
			data-size={size}
			data-active={isActive}
			className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
			{...props}
		/>
	);

	if (!tooltip || open) {
		return menuButton;
	}

	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>{menuButton}</Tooltip.Trigger>
			<Tooltip.Content
				align='center'
				side='right'
				sideOffset={8}
			>
				{tooltip}
			</Tooltip.Content>
		</Tooltip.Root>
	);
};

const Trigger = ({
	asChild = false,
	className,
	onClick,
	...props
}: SidebarTriggerProps) => {
	const toggleSidebar = useSidebar((s) => s.toggleSidebar);
	const open = useSidebar((s) => s.open);
	const { t } = useTranslate();

	const Icon = open ? PanelLeftCloseIcon : PanelLeftOpenIcon;

	return (
		<Button
			asChild={asChild}
			data-sidebar='trigger'
			data-slot='sidebar-trigger'
			variant='secondary'
			isIcon={true}
			isGhost={true}
			size='md'
			className={cn('size-8 rounded-md', className)}
			onClick={(event) => {
				onClick?.(event);
				toggleSidebar();
			}}
			{...props}
		>
			<Icon />
			<span className='sr-only'>{t('a11y.toggleSidebar')}</span>
		</Button>
	);
};

export const Sidebar = {
	Root,
	Panel,
	Inset,
	Content,
	Group,
	GroupLabel,
	GroupContent,
	Menu,
	MenuItem,
	MenuButton,
	Trigger,
};
