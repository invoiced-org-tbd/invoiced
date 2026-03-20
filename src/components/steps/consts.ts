import { cva } from 'class-variance-authority';

export const stepsTriggerVariants = cva(
	'group/step relative flex min-w-0 flex-1 flex-col items-center gap-2 rounded-md border-none bg-transparent px-0 py-[10px] text-center transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: '',
				error: '',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export const stepsIndicatorVariants = cva(
	'relative z-10 flex size-8 items-center justify-center rounded-full border text-xs font-semibold transition-all',
	{
		variants: {
			state: {
				completed: 'border-primary bg-primary text-primary-foreground',
				active:
					'border-primary bg-background text-primary ring-4 ring-primary/20',
				upcoming:
					'border-muted-foreground/30 bg-background text-muted-foreground',
				errorCompleted: 'border-destructive text-destructive bg-destructive/5',
				errorActive:
					'border-destructive bg-background text-destructive ring-4 ring-destructive/20',
				errorUpcoming:
					'border-destructive/60 text-destructive bg-destructive/5',
			},
		},
		defaultVariants: {
			state: 'upcoming',
		},
	},
);

export const stepsLabelVariants = cva(
	'text-xs font-medium leading-tight transition-colors',
	{
		variants: {
			state: {
				completed: 'text-foreground',
				active: 'text-foreground',
				upcoming: 'text-muted-foreground',
				errorCompleted: 'text-destructive',
				errorActive: 'text-destructive',
				errorUpcoming: 'text-destructive/90',
			},
		},
		defaultVariants: {
			state: 'upcoming',
		},
	},
);

export const stepsConnectorVariants = cva(
	'pointer-events-none absolute top-1/2 h-0.5 -translate-y-1/2 bg-border',
	{
		variants: {
			state: {
				completed: 'bg-primary',
				error: 'bg-destructive',
				upcoming: 'bg-border',
			},
		},
		defaultVariants: {
			state: 'upcoming',
		},
	},
);
