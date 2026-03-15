import type { ComponentProps } from 'react';
import type { Drawer as DrawerPrimitive } from 'vaul';

export type DrawerRootProps = ComponentProps<typeof DrawerPrimitive.Root>;

export type DrawerTriggerProps = ComponentProps<typeof DrawerPrimitive.Trigger>;

export type DrawerPortalProps = ComponentProps<typeof DrawerPrimitive.Portal>;

export type DrawerCloseProps = ComponentProps<typeof DrawerPrimitive.Close>;

export type DrawerOverlayProps = ComponentProps<typeof DrawerPrimitive.Overlay>;

export type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Content>;

export type DrawerBodyProps = ComponentProps<'div'>;

export type DrawerHeaderProps = ComponentProps<'div'>;

export type DrawerFooterProps = ComponentProps<'div'>;

export type DrawerTitleProps = ComponentProps<typeof DrawerPrimitive.Title>;

export type DrawerDescriptionProps = ComponentProps<
	typeof DrawerPrimitive.Description
>;
