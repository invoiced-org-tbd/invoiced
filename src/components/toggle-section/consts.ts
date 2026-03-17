import { cva } from 'class-variance-authority';

export const toggleSectionVariants = cva(
	'rounded-lg border px-3 py-4 transition-colors',
	{
		variants: {
			variant: {
				primary: 'bg-primary/5 border-primary/15 text-foreground',
				secondary: 'bg-secondary/30 border-secondary text-secondary-foreground',
				destructive: 'bg-destructive/7 border-destructive/20 text-foreground',
				info: 'bg-blue-500/8 border-blue-500/20 text-foreground',
			},
		},
		defaultVariants: {
			variant: 'primary',
		},
	},
);

export const toggleSectionHeaderVariants = cva(
	'w-full cursor-pointer select-none text-left text-sm font-semibold leading-none outline-none',
	{
		variants: {
			variant: {
				primary: 'text-primary',
				secondary: 'text-secondary-foreground',
				destructive: 'text-destructive',
				info: 'text-blue-500 dark:text-blue-400',
			},
		},
		defaultVariants: {
			variant: 'primary',
		},
	},
);
