import { cn } from '@/utils/classNamesUtils';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';

const toggleVariants = cva(
	cn(
		'inline-flex items-center justify-center rounded-md text-sm font-medium',
		'transition-colors outline-none cursor-pointer',
		'hover:bg-muted hover:text-muted-foreground',
		'focus-visible:ring-2 focus-visible:ring-ring/50',
		'disabled:pointer-events-none disabled:opacity-50',
		'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0',
	),
	{
		variants: {
			variant: {
				default: 'bg-transparent',
				outline:
					'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
			},
			size: {
				sm: 'h-7 min-w-7 px-1.5 [&_svg:not([class*=size-])]:size-3.5',
				md: 'h-8 min-w-8 px-2 [&_svg:not([class*=size-])]:size-4',
				lg: 'h-9 min-w-9 px-2.5 [&_svg:not([class*=size-])]:size-4.5',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);

type ToggleProps = ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
	VariantProps<typeof toggleVariants>;

const Toggle = ({ className, variant, size, ...props }: ToggleProps) => (
	<TogglePrimitive.Root
		className={cn(toggleVariants({ variant, size }), className)}
		{...props}
	/>
);

export { Toggle, toggleVariants };
