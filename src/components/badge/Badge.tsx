import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { badgeVariants } from './consts';
import type { BadgeProps } from './types';

export const Badge = ({
	className,
	variant = 'default',
	asChild = false,
	...props
}: BadgeProps) => {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp
			data-slot='badge'
			data-variant={variant}
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
};
