import { Button } from '@/components/button/Button';
import { ModalInteractionContainerProvider } from '@/components/modal-interaction-container-context';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
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
	const { t } = useTranslate();

	return (
		<Portal>
			<Overlay />
			<DialogContentPrimitive
				ref={setContentElement}
				data-slot='dialog-content'
				className={cn(
					'border border-border bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 duration-100',
					'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
					'flex w-full sm:max-w-sm max-w-[calc(100%-2rem)] max-h-[calc(100dvh-2rem)] min-h-0 flex-col overflow-hidden rounded-xl text-sm outline-hidden',
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
								<span className='sr-only'>{t('common.close')}</span>
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
			className={cn(
				'flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4',
				className,
			)}
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
			className={cn('gap-2 flex shrink-0 flex-col px-4 py-3', className)}
			{...props}
		/>
	);
};

const Footer = ({ className, children, ...props }: DialogFooterProps) => {
	return (
		<div
			data-slot='dialog-footer'
			className={cn(
				'bg-muted/50 border-t border-border in-data-[slot=dialog-body]:p-0 p-4',
				'flex shrink-0 gap-2 justify-end items-center',
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
