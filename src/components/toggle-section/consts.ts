import { cva } from 'class-variance-authority';

export const toggleSectionVariants = cva(
	'rounded-lg border p-4 transition-colors',
	{
		variants: {
			variant: {
				primary: 'bg-primary/5 border-primary/15 text-foreground',
				secondary:
					'bg-secondary/12 border-secondary/20 text-secondary-foreground',
				destructive: 'bg-destructive/7 border-destructive/20 text-foreground',
				info: 'bg-info/8 border-info/20 text-foreground',
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
				secondary: 'text-secondary',
				destructive: 'text-destructive',
				info: 'text-info',
			},
		},
		defaultVariants: {
			variant: 'primary',
		},
	},
);
