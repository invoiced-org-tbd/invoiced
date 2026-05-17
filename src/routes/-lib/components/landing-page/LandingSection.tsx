import { cn } from '@/utils/classNamesUtils';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion/usePrefersReducedMotion';
import { fadeUp, getMotionProps } from './landingMotion';

type LandingSectionProps = {
	id?: string;
	children: ReactNode;
	className?: string;
	muted?: boolean;
	animate?: boolean;
};

export const LandingSection = ({
	id,
	children,
	className,
	muted = false,
	animate = true,
}: LandingSectionProps) => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const motionProps = getMotionProps(prefersReducedMotion);

	if (!animate || prefersReducedMotion) {
		return (
			<section
				id={id}
				className={cn('py-12 md:py-16', muted && 'bg-muted', className)}
			>
				<div className='mx-auto max-w-7xl px-4 md:px-12'>{children}</div>
			</section>
		);
	}

	return (
		<section
			id={id}
			className={cn('py-12 md:py-16', muted && 'bg-muted', className)}
		>
			<motion.div
				className='mx-auto max-w-7xl px-4 md:px-12'
				variants={fadeUp}
				{...motionProps}
			>
				{children}
			</motion.div>
		</section>
	);
};
