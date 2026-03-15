import { Button } from '@/components/button';
import { cn } from '@/lib/utils';
import {
	Close as DialogClosePrimitive,
	Content as DialogContentPrimitive,
	Description as DialogDescriptionPrimitive,
	Overlay as DialogOverlayPrimitive,
	Portal as DialogPortalPrimitive,
	Root as DialogRootPrimitive,
	Title as DialogTitlePrimitive,
	Trigger as DialogTriggerPrimitive,
} from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import type {
	DialogCloseProps,
	DialogContentProps,
	DialogDescriptionProps,
	DialogFooterProps,
	DialogHeaderProps,
	DialogOverlayProps,
	DialogPortalProps,
	DialogRootProps,
	DialogTitleProps,
	DialogTriggerProps,
} from './types';

const Root = ({ ...props }: DialogRootProps) => {
	return (
		<DialogRootPrimitive
			data-slot='dialog'
			{...props}
		/>
	);
};

const Trigger = ({ ...props }: DialogTriggerProps) => {
	return (
		<DialogTriggerPrimitive
			data-slot='dialog-trigger'
			{...props}
		/>
	);
};

const Portal = ({ ...props }: DialogPortalProps) => {
	return (
		<DialogPortalPrimitive
			data-slot='dialog-portal'
			{...props}
		/>
	);
};

const Close = ({ ...props }: DialogCloseProps) => {
	return (
		<DialogClosePrimitive
			data-slot='dialog-close'
			{...props}
		/>
	);
};

const Overlay = ({ className, ...props }: DialogOverlayProps) => {
	return (
		<DialogOverlayPrimitive
			data-slot='dialog-overlay'
			className={cn(
				'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50 duration-100',
				className,
			)}
			{...props}
		/>
	);
};

const Content = ({
	className,
	children,
	showCloseButton = true,
	...props
}: DialogContentProps) => {
	return (
		<Portal>
			<Overlay />
			<DialogContentPrimitive
				data-slot='dialog-content'
				className={cn(
					'bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-xl p-4 text-sm ring-1 duration-100 sm:max-w-sm fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 outline-hidden',
					className,
				)}
				{...props}
			>
				{children}

				{showCloseButton && (
					<DialogClosePrimitive
						data-slot='dialog-close'
						asChild
					>
						<Button
							variant='secondary'
							isGhost={true}
							isIcon={true}
							size='sm'
							className='absolute top-2 right-2'
						>
							<XIcon />
							<span className='sr-only'>close</span>
						</Button>
					</DialogClosePrimitive>
				)}
			</DialogContentPrimitive>
		</Portal>
	);
};

const Header = ({ className, ...props }: DialogHeaderProps) => {
	return (
		<div
			data-slot='dialog-header'
			className={cn('gap-2 flex flex-col', className)}
			{...props}
		/>
	);
};

const Footer = ({ className, children, ...props }: DialogFooterProps) => {
	return (
		<div
			data-slot='dialog-footer'
			className={cn(
				'bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

const Title = ({ className, ...props }: DialogTitleProps) => {
	return (
		<DialogTitlePrimitive
			data-slot='dialog-title'
			className={cn('text-base leading-none font-medium', className)}
			{...props}
		/>
	);
};

const Description = ({ className, ...props }: DialogDescriptionProps) => {
	return (
		<DialogDescriptionPrimitive
			data-slot='dialog-description'
			className={cn(
				'text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3',
				className,
			)}
			{...props}
		/>
	);
};

export const Dialog = {
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
};
