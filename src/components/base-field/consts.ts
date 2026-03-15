import { cva } from 'class-variance-authority';

// Reuse these variants for future DateInput/NumberInput components by choosing
// the appropriate height, padding, and focus mode without coupling to markup.
export const fieldInputVariants = cva(
	'dark:bg-input/30 border-input aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-lg border bg-transparent px-2.5 py-1 text-base md:text-sm transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 w-full min-w-0 shadow-xs',
	{
		variants: {
			height: {
				fixed: 'h-8',
				min: 'min-h-8',
			},
			focusMode: {
				focusVisible: 'focus-visible:border-primary',
				focus: 'focus:border-primary',
			},
		},
		defaultVariants: {
			height: 'fixed',
			focusMode: 'focusVisible',
		},
	},
);

export const inputButtonsSideClassName =
	'pointer-events-none absolute inset-y-0 z-10 flex items-center gap-1 px-1';

export const inputButtonClassName = 'pointer-events-auto';

export const toggleControlVariants = cva(
	'aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-primary focus-visible:ring-ring/50 focus-visible:ring-3 focus-visible:aria-invalid:ring-destructive/20 dark:focus-visible:aria-invalid:ring-destructive/40 focus-visible:aria-invalid:ring-3 shrink-0 border peer relative outline-none',
	{
		variants: {
			disabledSelector: {
				native:
					'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-input/50 dark:disabled:bg-input/80',
				data: 'data-disabled:cursor-not-allowed data-disabled:opacity-50',
			},
			shape: {
				square: 'rounded-[4px]',
				pill: 'rounded-full',
			},
			size: {
				checkbox: 'flex size-4 items-center justify-center',
				switch: 'inline-flex h-[18.4px] w-[32px] items-center',
			},
		},
		defaultVariants: {
			disabledSelector: 'native',
			shape: 'square',
			size: 'checkbox',
		},
	},
);
