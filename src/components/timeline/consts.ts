import { cva } from 'class-variance-authority';

export const timelineRootVariants = cva(
	'grid w-full [&>li]:grid-cols-[0_min-content_1fr]',
	{
		variants: {
			dense: {
				true: '**:data-[slot=timeline-indicator]:my-2 **:data-[slot=timeline-title]:pb-1.5 **:data-[slot=timeline-description]:pb-2',
				false: '',
			},
		},
		defaultVariants: {
			dense: false,
		},
	},
);

export const timelineItemVariants = cva(
	'group/timeline-item grid items-start gap-x-0',
	{
		variants: {
			state: {
				completed: 'text-primary',
				current: 'text-primary',
				upcoming: 'text-muted-foreground',
				error: 'text-destructive',
			},
		},
		defaultVariants: {
			state: 'upcoming',
		},
	},
);

export const timelineIndicatorVariants = cva(
	'col-start-2 col-end-3 row-start-1 row-end-1 my-2.5 flex size-4.5 shrink-0 items-center justify-center rounded-full border',
	{
		variants: {
			state: {
				completed: 'border-primary bg-primary text-primary-foreground',
				current: 'border-primary/30 bg-primary/20 text-primary',
				upcoming:
					'border-muted-foreground/30 bg-background text-muted-foreground',
				error: 'border-destructive bg-destructive/10 text-destructive',
			},
		},
		defaultVariants: {
			state: 'upcoming',
		},
	},
);

export const timelineConnectorVariants = cva(
	'col-start-2 col-end-3 row-start-2 row-end-2 mx-auto flex h-full min-h-10 w-0.5 justify-center rounded-full bg-border',
	{
		variants: {
			state: {
				completed: 'bg-primary',
				current: 'bg-border',
				upcoming: 'bg-border',
				error: 'bg-destructive/30',
			},
		},
		defaultVariants: {
			state: 'upcoming',
		},
	},
);

export const timelineContentVariants = cva(
	'col-start-3 col-end-4 row-start-1 row-end-3 mr-auto w-full pl-4 text-left',
);

export const timelineTitleVariants = cva(
	'flex w-full items-center justify-between gap-2 pt-2.5 pb-2 text-sm font-medium md:text-lg',
	{
		variants: {
			state: {
				completed: 'text-foreground',
				current: 'text-foreground',
				upcoming: 'text-muted-foreground',
				error: 'text-destructive',
			},
		},
		defaultVariants: {
			state: 'upcoming',
		},
	},
);

export const timelineMetaVariants = cva(
	'text-muted-foreground shrink-0 text-xs font-normal text-nowrap md:text-sm',
);

export const timelineDescriptionVariants = cva(
	'text-muted-foreground pb-3 text-sm',
);
