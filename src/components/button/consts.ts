import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
	cn(
		'flex items-center justify-center whitespace-nowrap rounded-lg transition-colors gap-2',
		'font-semibold text-foreground cursor-pointer',
		'focus-visible:outline-none focus-visible:ring-3',
		'border w-fit h-max leading-none!',
		'[&_svg:not([class*=size-])]:size-4',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0',
	),
	{
		variants: {
			variant: {
				primary:
					'bg-primary hover:bg-primary/80 border-primary hover:border-primary/80 focus-visible:ring-primary/25',
				secondary:
					'bg-secondary hover:bg-secondary/80 border-secondary hover:border-secondary/80 focus-visible:ring-secondary',
				destructive:
					'bg-destructive text-background border-destructive hover:bg-destructive/80 border-destructive hover:border-destructive/80 focus-visible:ring-destructive/25',
			},
			isOutlined: {
				true: 'bg-transparent hover:text-background',
			},
			isGhost: {
				true: 'bg-transparent focus-visible:ring-foreground/5',
			},
			disabled: {
				true: 'opacity-65 cursor-not-allowed overflow-hidden',
			},
			isLoading: {
				true: 'pointer-events-none',
			},
			size: {
				xxs: 'py-1 px-3 text-xs',
				xs: 'py-1.5 px-3.5 text-xs',
				sm: 'py-2 px-3.5 text-sm',
				md: 'py-2.5 px-3.5 text-sm',
				lg: 'py-3 px-4 text-lg',
			},
			isIcon: {
				true: 'p-0 rounded-full',
			},
		},
		compoundVariants: [
			// Outlined variants
			{
				isOutlined: true,
				variant: 'primary',
				className: 'text-primary',
			},
			{
				isOutlined: true,
				variant: 'secondary',
				className: 'text-foreground/80 hover:text-foreground',
			},
			{
				isOutlined: true,
				variant: 'destructive',
				className: 'text-destructive/80',
			},

			// Ghost variants
			{
				isGhost: true,
				variant: 'primary',
				className: 'text-primary',
			},
			{
				isGhost: true,
				variant: 'secondary',
				className: 'text-foreground/80 hover:text-foreground',
			},
			{
				isGhost: true,
				variant: 'destructive',
				className: 'text-destructive/80',
			},

			// Ghost outlined variants
			{
				isGhost: true,
				isOutlined: false,
				className:
					'border-transparent hover:border-transparent hover:bg-foreground/5',
			},

			// Icon size variants
			{
				isIcon: true,
				size: 'xxs',
				className: 'size-5 min-w-5 [&_svg:not([class*=size-])]:size-3.5',
			},
			{
				isIcon: true,
				size: 'xs',
				className: 'size-6 min-w-6 [&_svg:not([class*=size-])]:size-4',
			},
			{
				isIcon: true,
				size: 'sm',
				className: 'size-7 min-w-7 [&_svg:not([class*=size-])]:size-4',
			},
			{
				isIcon: true,
				size: 'md',
				className: 'size-8 min-w-8 [&_svg:not([class*=size-])]:size-4.5',
			},
			{
				isIcon: true,
				size: 'lg',
				className: 'size-9 min-w-9 [&_svg:not([class*=size-])]:size-5',
			},
		],
		defaultVariants: {
			variant: 'primary',
			size: 'sm',
			isOutlined: false,
			disabled: false,
			isLoading: false,
		},
	},
);
