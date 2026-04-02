import { cn } from '@/utils/classNamesUtils';
import { cva } from 'class-variance-authority';

export const dialogContentVariants = cva(
	cn(
		'border border-border bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 duration-100',
		'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
		'flex min-w-0 max-w-[min(42rem,calc(100%-2rem))] max-h-[calc(100dvh-2rem)] min-h-0 flex-col overflow-hidden rounded-xl text-sm outline-hidden',
		'max-w-[92vw] max-h-[92vh]',
	),
	{
		variants: {
			size: {
				auto: 'w-max',
				sm: 'w-sm',
				md: 'w-md',
				lg: 'w-lg',
				xl: 'w-5xl h-[82vh]',
			},
		},
		defaultVariants: {
			size: 'auto',
		},
	},
);
