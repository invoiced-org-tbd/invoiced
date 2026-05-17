import { cn } from '@/utils/classNamesUtils';

type LandingSectionHeaderProps = {
	title: string;
	subtitle?: string;
	className?: string;
	centered?: boolean;
};

export const LandingSectionHeader = ({
	title,
	subtitle,
	className,
	centered = true,
}: LandingSectionHeaderProps) => {
	return (
		<div
			className={cn(
				'mb-10 md:mb-12',
				centered && 'mx-auto max-w-3xl text-center',
				className,
			)}
		>
			<h2 className='text-3xl font-extrabold tracking-tight text-balance md:text-4xl lg:text-5xl'>
				{title}
			</h2>
			{subtitle && (
				<p className='mt-4 text-lg text-muted-foreground text-balance md:text-xl'>
					{subtitle}
				</p>
			)}
		</div>
	);
};
