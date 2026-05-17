import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion/usePrefersReducedMotion';
import { cn } from '@/utils/classNamesUtils';
import { getMotionProps, staggerContainer, staggerItem } from './landingMotion';
import { landingCopy } from './landingCopy';
import { LandingSection } from './LandingSection';
import { LandingSectionHeader } from './LandingSectionHeader';

export const LandingFaqSection = () => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const motionProps = getMotionProps(prefersReducedMotion);

	return (
		<LandingSection
			id='faq'
			muted
			animate={false}
		>
			<LandingSectionHeader title={landingCopy.faq.title} />
			<motion.div
				className='mx-auto max-w-3xl space-y-3'
				variants={staggerContainer(0.06)}
				{...motionProps}
			>
				{landingCopy.faq.items.map((item) => (
					<motion.div
						key={item.question}
						variants={prefersReducedMotion ? undefined : staggerItem}
					>
						<details
							className={cn(
								'group rounded-3xl border border-border bg-card px-6 py-4',
								'open:pb-5',
							)}
						>
							<summary className='cursor-pointer list-none font-semibold marker:hidden [&::-webkit-details-marker]:hidden'>
								<span className='flex items-center justify-between gap-4'>
									{item.question}
									<span className='text-muted-foreground transition-transform group-open:rotate-45'>
										+
									</span>
								</span>
							</summary>
							<p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
								{item.answer}
							</p>
						</details>
					</motion.div>
				))}
			</motion.div>
		</LandingSection>
	);
};
