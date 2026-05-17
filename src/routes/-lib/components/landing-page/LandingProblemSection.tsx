import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion/usePrefersReducedMotion';
import { getMotionProps, staggerContainer, staggerItem } from './landingMotion';
import { landingCopy } from './landingCopy';
import { LandingSection } from './LandingSection';
import { LandingSectionHeader } from './LandingSectionHeader';

export const LandingProblemSection = () => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const motionProps = getMotionProps(prefersReducedMotion);

	return (
		<LandingSection
			id='problem'
			animate={false}
		>
			<LandingSectionHeader title={landingCopy.problem.title} />
			<motion.ul
				className='mx-auto mb-8 max-w-2xl space-y-3'
				variants={staggerContainer(0.06)}
				{...motionProps}
			>
				{landingCopy.problem.painPoints.map((point) => (
					<motion.li
						key={point}
						variants={prefersReducedMotion ? undefined : staggerItem}
						className='flex items-start gap-3 text-muted-foreground'
					>
						<span className='mt-2 size-1.5 shrink-0 rounded-full bg-primary-muted' />
						<span>{point}</span>
					</motion.li>
				))}
			</motion.ul>
			<p className='mx-auto max-w-2xl text-center text-lg font-semibold text-foreground'>
				{landingCopy.problem.transition}
			</p>
		</LandingSection>
	);
};
