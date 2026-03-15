import { cn } from '@/lib/utils';
import { Drawer as DrawerPrimitive } from 'vaul';
import type {
	DrawerBodyProps,
	DrawerCloseProps,
	DrawerContentProps,
	DrawerDescriptionProps,
	DrawerFooterProps,
	DrawerHeaderProps,
	DrawerOverlayProps,
	DrawerPortalProps,
	DrawerRootProps,
	DrawerTitleProps,
	DrawerTriggerProps,
} from './types';

const Root = ({
	direction = 'right',
	autoFocus = true,
	...props
}: DrawerRootProps) => {
	return (
		<DrawerPrimitive.Root
			data-slot='drawer'
			direction={direction}
			autoFocus={autoFocus}
			{...props}
		/>
	);
};

const Trigger = ({ ...props }: DrawerTriggerProps) => {
	return (
		<DrawerPrimitive.Trigger
			data-slot='drawer-trigger'
			{...props}
		/>
	);
};

const Portal = ({ ...props }: DrawerPortalProps) => {
	return (
		<DrawerPrimitive.Portal
			data-slot='drawer-portal'
			{...props}
		/>
	);
};

const Close = ({ ...props }: DrawerCloseProps) => {
	return (
		<DrawerPrimitive.Close
			data-slot='drawer-close'
			{...props}
		/>
	);
};

const Overlay = ({ className, ...props }: DrawerOverlayProps) => {
	return (
		<DrawerPrimitive.Overlay
			data-slot='drawer-overlay'
			className={cn(
				'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50',
				className,
			)}
			{...props}
		/>
	);
};

const Content = ({ className, children, ...props }: DrawerContentProps) => {
	return (
		<Portal>
			<Overlay />
			<DrawerPrimitive.Content
				data-slot='drawer-content'
				className={cn(
					'bg-background flex h-auto flex-col text-sm data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-r-xl data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-l-xl data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm group/drawer-content fixed z-50',
					className,
				)}
				{...props}
			>
				<div className='bg-muted mt-4 h-1 w-[100px] rounded-full mx-auto hidden shrink-0 group-data-[vaul-drawer-direction=bottom]/drawer-content:block' />

				{children}
			</DrawerPrimitive.Content>
		</Portal>
	);
};

const Body = ({ className, children, ...props }: DrawerBodyProps) => {
	return (
		<div
			data-slot='drawer-body'
			className={cn('px-4 flex flex-col', className)}
			{...props}
		>
			{children}
		</div>
	);
};

const Header = ({ className, ...props }: DrawerHeaderProps) => {
	return (
		<div
			data-slot='drawer-header'
			className={cn(
				'gap-0.5 py-2 my-2 px-2 mx-2 border-b border-border group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-0.5 md:text-left flex flex-col',
				className,
			)}
			{...props}
		/>
	);
};

const Footer = ({ className, ...props }: DrawerFooterProps) => {
	return (
		<div
			data-slot='drawer-footer'
			className={cn('gap-2 py-4 flex', className)}
			{...props}
		/>
	);
};

const Title = ({ className, ...props }: DrawerTitleProps) => {
	return (
		<DrawerPrimitive.Title
			data-slot='drawer-title'
			className={cn('text-foreground text-base font-medium', className)}
			{...props}
		/>
	);
};

const Description = ({ className, ...props }: DrawerDescriptionProps) => {
	return (
		<DrawerPrimitive.Description
			data-slot='drawer-description'
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
};

export const Drawer = {
	Root,
	Trigger,
	Portal,
	Close,
	Overlay,
	Content,
	Header,
	Footer,
	Title,
	Description,
	Body,
};
