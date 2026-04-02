import type { ComponentProps, PropsWithChildren } from 'react';
import type * as DialogPrimitive from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';
import type { dialogContentVariants } from './consts';

export type DialogRootProps = ComponentProps<typeof DialogPrimitive.Root>;

export type DialogTriggerProps = ComponentProps<typeof DialogPrimitive.Trigger>;

export type DialogPortalProps = ComponentProps<typeof DialogPrimitive.Portal>;

export type DialogCloseProps = ComponentProps<typeof DialogPrimitive.Close>;

export type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>;

type DialogContentVariantsProps = VariantProps<typeof dialogContentVariants>;
type DialogContentSize = NonNullable<DialogContentVariantsProps['size']>;

export type DialogContentProps = PropsWithChildren<{
	showCloseButton?: boolean;
	className?: string;
	size?: DialogContentSize;
}>;

export type DialogBodyProps = ComponentProps<'div'>;

export type DialogHeaderProps = ComponentProps<'div'>;

export type DialogFooterProps = ComponentProps<'div'>;

export type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

export type DialogDescriptionProps = ComponentProps<
	typeof DialogPrimitive.Description
>;
