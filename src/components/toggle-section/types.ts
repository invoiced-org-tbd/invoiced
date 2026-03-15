import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { toggleSectionVariants } from './consts';

export type ToggleSectionVariantProps = VariantProps<typeof toggleSectionVariants>;
export type ToggleSectionVariant = NonNullable<
	ToggleSectionVariantProps['variant']
>;

export type ToggleSectionRootProps = ComponentProps<'section'> &
	ToggleSectionVariantProps & {
		open?: boolean;
		defaultOpen?: boolean;
		onOpenChange?: (open: boolean) => void;
	};

export type ToggleSectionHeaderProps = ComponentProps<'button'>;

export type ToggleSectionTitleProps = ComponentProps<'h3'>;

export type ToggleSectionDescriptionProps = ComponentProps<'p'>;

export type ToggleSectionContentProps = ComponentProps<'div'>;

export type ToggleSectionFooterProps = ComponentProps<'div'>;
