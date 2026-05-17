import { Card } from '@/components/card/Card';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion/usePrefersReducedMotion';
import { getMotionProps, staggerContainer, staggerItem } from './landingMotion';
import { landingCopy } from './landingCopy';
import { LandingSection } from './LandingSection';
import { LandingSectionHeader } from './LandingSectionHeader';

export const LandingSolutionSection = () => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const motionProps = getMotionProps(prefersReducedMotion);

	return (
		<LandingSection
			id='solution'
			animate={false}
		>
			<LandingSectionHeader title={landingCopy.solution.title} />
			<motion.div
				className='grid gap-6 md:grid-cols-2'
				variants={staggerContainer(0.08)}
				{...motionProps}
			>
				{landingCopy.solution.features.map((feature) => (
					<motion.div
						key={feature.label}
						variants={prefersReducedMotion ? undefined : staggerItem}
					>
						<Card.Root className='h-full border-border/80'>
							<Card.Content className='p-6 md:p-8'>
								<p className='mb-2 text-xs font-semibold uppercase tracking-wide text-primary-muted'>
									{feature.label}
								</p>
								<h3 className='mb-3 text-xl font-extrabold tracking-tight'>
									{feature.title}
								</h3>
								<p className='mb-5 text-sm text-muted-foreground'>
									{feature.description}
								</p>
								<ul className='space-y-2'>
									{feature.bullets.map((bullet) => (
										<li
											key={bullet}
											className='flex items-center gap-2 text-sm'
										>
											<Check className='size-4 shrink-0 text-primary-muted' />
											<span>{bullet}</span>
										</li>
									))}
								</ul>
							</Card.Content>
						</Card.Root>
					</motion.div>
				))}
			</motion.div>
		</LandingSection>
	);
};
