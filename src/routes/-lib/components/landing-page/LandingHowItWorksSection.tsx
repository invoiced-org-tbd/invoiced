import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion/usePrefersReducedMotion';
import { getMotionProps, staggerContainer, staggerItem } from './landingMotion';
import { landingCopy } from './landingCopy';
import { LandingSection } from './LandingSection';
import { LandingSectionHeader } from './LandingSectionHeader';

export const LandingHowItWorksSection = () => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const motionProps = getMotionProps(prefersReducedMotion);

	return (
		<LandingSection
			id='how-it-works'
			muted
			animate={false}
		>
			<LandingSectionHeader title={landingCopy.howItWorks.title} />
			<motion.div
				className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'
				variants={staggerContainer()}
				{...motionProps}
			>
				{landingCopy.howItWorks.steps.map((step, index) => (
					<motion.div
						key={step.title}
						variants={prefersReducedMotion ? undefined : staggerItem}
						className='text-center'
					>
						<div className='mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground'>
							{index + 1}
						</div>
						<h3 className='mb-2 text-lg font-extrabold'>{step.title}</h3>
						<p className='text-sm text-muted-foreground'>{step.description}</p>
					</motion.div>
				))}
			</motion.div>
		</LandingSection>
	);
};
