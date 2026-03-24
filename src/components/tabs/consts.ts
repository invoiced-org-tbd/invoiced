import { cva } from 'class-variance-authority';

export const tabsTriggerVariants = cva(
	"gap-2 rounded-md border border-transparent px-1.5 py-2 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					'text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground data-active:bg-input/20 data-active:text-foreground data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground',
				error:
					'text-destructive/70 hover:text-destructive dark:text-destructive/80 dark:hover:text-destructive data-active:border-destructive/40 data-active:bg-destructive/10 data-active:text-destructive data-active:shadow-sm dark:data-active:border-destructive/20 dark:bg-destructive/10 dark:text-destructive',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);
