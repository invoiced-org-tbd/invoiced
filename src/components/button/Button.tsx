import { Slot } from '@radix-ui/react-slot';
import { LoaderCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from './consts';
import type { ButtonProps } from './types';
import { Tooltip } from '../tooltip';

export const Button = ({
	className,
	variant,
	isOutlined,
	size,
	isGhost,
	asChild = false,
	disabled,
	isLoading,
	isIcon,
	children,
	tooltip,
	...props
}: ButtonProps) => {
	const Comp = asChild ? Slot : 'button';
	const isDisabled = !!disabled || !!isLoading;

	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>
				<Comp
					className={cn(
						buttonVariants({
							variant,
							size,
							isOutlined,
							isGhost,
							disabled: isDisabled,
							isLoading,
							isIcon,
							className,
						}),
					)}
					data-loading={isLoading}
					data-slot='button'
					disabled={isDisabled}
					type='button'
					{...props}
				>
					<div className='relative flex items-center justify-center'>
						<span
							className={cn(
								'flex items-center justify-center gap-2',
								isLoading && 'opacity-0',
							)}
						>
							{children}
						</span>

						{isLoading && (
							<LoaderCircleIcon className='absolute animate-spin size-4.5' />
						)}
					</div>
				</Comp>
			</Tooltip.Trigger>

			{!!tooltip && <Tooltip.Content>{tooltip}</Tooltip.Content>}
		</Tooltip.Root>
	);
};
