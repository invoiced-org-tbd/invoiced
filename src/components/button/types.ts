import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from './consts';

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type ButtonVariant = NonNullable<ButtonVariantProps['variant']>;
export type ButtonSize = NonNullable<ButtonVariantProps['size']>;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	ButtonVariantProps & {
		tooltip?: ReactNode;
		asChild?: boolean;
	};
