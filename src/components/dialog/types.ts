import type { ComponentProps } from 'react';
import type * as DialogPrimitive from '@radix-ui/react-dialog';

export type DialogRootProps = ComponentProps<typeof DialogPrimitive.Root>;

export type DialogTriggerProps = ComponentProps<typeof DialogPrimitive.Trigger>;

export type DialogPortalProps = ComponentProps<typeof DialogPrimitive.Portal>;

export type DialogCloseProps = ComponentProps<typeof DialogPrimitive.Close>;

export type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>;

export type DialogContentProps = ComponentProps<
	typeof DialogPrimitive.Content
> & {
	showCloseButton?: boolean;
};

export type DialogHeaderProps = ComponentProps<'div'>;

export type DialogFooterProps = ComponentProps<'div'>;

export type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

export type DialogDescriptionProps = ComponentProps<
	typeof DialogPrimitive.Description
>;
