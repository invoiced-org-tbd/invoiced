import { Button } from '@/components/button';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';
import { useEffect } from 'react';
import {
	SIDEBAR_KEYBOARD_SHORTCUT,
	SIDEBAR_WIDTH,
	SIDEBAR_WIDTH_ICON,
	sidebarMenuButtonVariants,
} from './consts';
import type {
	SidebarContentProps,
	SidebarGroupContentProps,
	SidebarGroupLabelProps,
	SidebarGroupProps,
	SidebarMenuButtonProps,
	SidebarMenuItemProps,
	SidebarMenuProps,
	SidebarPanelProps,
	SidebarRootProps,
	SidebarTriggerProps,
} from './types';
import { useSidebar } from './useSidebar';

const Root = ({ className, style, children, ...props }: SidebarRootProps) => {
	const isMobile = useIsMobile();
	const setIsMobile = useSidebar((s) => s.setIsMobile);
	const toggleSidebar = useSidebar((s) => s.toggleSidebar);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				toggleSidebar();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [toggleSidebar]);

	useEffect(() => {
		setIsMobile(isMobile);
	}, [isMobile, setIsMobile]);

	return (
		<div
			data-slot='sidebar-wrapper'
			style={
				{
					'--sidebar-width': SIDEBAR_WIDTH,
					'--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
					...style,
				} as React.CSSProperties
			}
			className={cn('group/sidebar-wrapper flex min-h-svh w-full', className)}
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
	const isMobile = useSidebar((s) => s.isMobile);
	const open = useSidebar((s) => s.open);
	const state = open ? 'expanded' : 'collapsed';

	if (isMobile) {
		return null;
	}

	return (
		<div
			className='group peer text-sidebar-foreground hidden md:block'
			data-state={state}
			data-collapsible={state === 'collapsed' ? collapsible : ''}
			data-slot='sidebar'
		>
			<div
				data-slot='sidebar-gap'
				className='relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
			/>
			<div
				data-slot='sidebar-container'
				className={cn(
					'fixed inset-y-0 left-0 z-10 hidden h-svh w-(--sidebar-width) border-r transition-[left,right,width] duration-200 ease-linear md:flex',
					'group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]',
					'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
					'overflow-hidden',
					className,
				)}
				{...props}
			>
				<div
					data-slot='sidebar-inner'
					className='bg-sidebar flex size-full flex-col'
				>
					{children}
				</div>
			</div>
		</div>
	);
};

const Content = ({ className, ...props }: SidebarContentProps) => {
	return (
		<div
			data-slot='sidebar-content'
			data-sidebar='content'
			className={cn(
				'no-scrollbar gap-0 py-1 flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden',
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
			className={cn(
				'px-2 py-1 relative flex w-full min-w-0 flex-col',
				className,
			)}
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
				'text-sidebar-foreground/70 h-5 px-2 text-xs font-medium [&>svg]:size-4 [&>svg]:shrink-0 group-data-[state=collapsed]:hidden',
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
			className={cn('text-sm w-full', className)}
			{...props}
		/>
	);
};

const Menu = ({ className, ...props }: SidebarMenuProps) => {
	return (
		<ul
			data-slot='sidebar-menu'
			data-sidebar='menu'
			className={cn('gap-0.5 flex w-full min-w-0 flex-col', className)}
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
	className,
	...props
}: SidebarMenuButtonProps) => {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='sidebar-menu-button'
			data-sidebar='menu-button'
			data-size={size}
			data-active={isActive}
			className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
			{...props}
		/>
	);
};

const Trigger = ({ className, onClick, ...props }: SidebarTriggerProps) => {
	const toggleSidebar = useSidebar((s) => s.toggleSidebar);
	const open = useSidebar((s) => s.open);

	const Icon = open ? PanelLeftCloseIcon : PanelLeftOpenIcon;

	return (
		<Button
			data-sidebar='trigger'
			data-slot='sidebar-trigger'
			variant='secondary'
			isIcon={true}
			isGhost={true}
			className={cn('rounded-lg', className)}
			onClick={(event) => {
				onClick?.(event);
				toggleSidebar();
			}}
			{...props}
		>
			<Icon />
			<span className='sr-only'>Toggle Sidebar</span>
		</Button>
	);
};

export const Sidebar = {
	Root,
	Panel,
	Content,
	Group,
	GroupLabel,
	GroupContent,
	Menu,
	MenuItem,
	MenuButton,
	Trigger,
};
