import { motion } from 'framer-motion';
import {
	motionInViewProps,
	staggerContainer,
	staggerItem,
} from './landingMotion';
import { landingCopy } from './landingCopy';
import { LandingSection } from './LandingSection';

export const LandingStatsSection = () => {
	return (
		<LandingSection
			muted
			animate={false}
		>
			<motion.div
				className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'
				variants={staggerContainer()}
				{...motionInViewProps}
			>
				{landingCopy.stats.map((stat) => (
					<motion.div
						key={stat.value}
						variants={staggerItem}
						className='text-center'
					>
						<p className='text-xl font-extrabold tracking-tight md:text-2xl'>
							{stat.value}
						</p>
						<p className='mt-2 text-sm text-muted-foreground'>
							{stat.description}
						</p>
					</motion.div>
				))}
			</motion.div>
		</LandingSection>
	);
};
