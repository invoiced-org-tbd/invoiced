import { Button } from '@/components/button';
import { ModalInteractionContainerProvider } from '@/components/modal-interaction-container-context';
import { cn } from '@/utils/classNamesUtils';
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
import { useState } from 'react';
import type {
	DialogBodyProps,
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
	const [contentElement, setContentElement] = useState<HTMLElement | null>(
		null,
	);

	return (
		<Portal>
			<Overlay />
			<DialogContentPrimitive
				ref={setContentElement}
				data-slot='dialog-content'
				className={cn(
					'bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 fixed top-1/2 left-1/2 z-50 flex w-full max-w-[calc(100%-2rem)] max-h-[calc(100dvh-2rem)] min-h-0 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl p-4 text-sm ring-1 duration-100 outline-hidden sm:max-w-sm',
					className,
				)}
				onEscapeKeyDown={(e) => {
					e.preventDefault();
				}}
				aria-describedby={undefined}
				{...props}
			>
				<ModalInteractionContainerProvider value={contentElement}>
					<div className='flex min-h-0 flex-1 flex-col overflow-hidden'>
						{children}
					</div>

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
				</ModalInteractionContainerProvider>
			</DialogContentPrimitive>
		</Portal>
	);
};

const Body = ({ className, children, ...props }: DialogBodyProps) => {
	return (
		<div
			data-slot='dialog-body'
			className={cn('flex min-h-0 flex-1 flex-col overflow-y-auto', className)}
			{...props}
		>
			{children}
		</div>
	);
};

const Header = ({ className, ...props }: DialogHeaderProps) => {
	return (
		<div
			data-slot='dialog-header'
			className={cn('gap-2 flex shrink-0 flex-col', className)}
			{...props}
		/>
	);
};

const Footer = ({ className, children, ...props }: DialogFooterProps) => {
	return (
		<div
			data-slot='dialog-footer'
			className={cn(
				'flex shrink-0 flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end',
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
	Body,
	Header,
	Footer,
	Title,
	Description,
};
