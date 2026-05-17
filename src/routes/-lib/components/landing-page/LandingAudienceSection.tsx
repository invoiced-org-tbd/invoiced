import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion/usePrefersReducedMotion';
import { getMotionProps } from './landingMotion';
import { landingCopy } from './landingCopy';
import { LandingSection } from './LandingSection';
import { LandingSectionHeader } from './LandingSectionHeader';

export const LandingAudienceSection = () => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const motionProps = getMotionProps(prefersReducedMotion);

	return (
		<LandingSection
			id='audience'
			animate={false}
		>
			<LandingSectionHeader
				title={landingCopy.audience.title}
				subtitle={landingCopy.audience.description}
			/>
			<motion.div
				className='flex flex-wrap justify-center gap-3'
				{...motionProps}
			>
				{landingCopy.audience.examples.map((example) => (
					<span
						key={example}
						className='rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold'
					>
						{example}
					</span>
				))}
			</motion.div>
		</LandingSection>
	);
};
