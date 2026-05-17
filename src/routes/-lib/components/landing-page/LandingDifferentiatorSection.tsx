import { Card } from '@/components/card/Card';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp, motionInViewProps } from './landingMotion';
import { landingCopy } from './landingCopy';
import { LandingSection } from './LandingSection';
import { LandingSectionHeader } from './LandingSectionHeader';

export const LandingDifferentiatorSection = () => {
	return (
		<LandingSection
			id='differentiator'
			muted
			animate={false}
		>
			<LandingSectionHeader
				title={landingCopy.differentiator.title}
				subtitle={landingCopy.differentiator.description}
			/>
			<motion.div
				className='grid gap-6 md:grid-cols-2'
				variants={fadeUp}
				{...motionInViewProps}
			>
				<Card.Root>
					<Card.Content className='p-6 md:p-8'>
						<h3 className='mb-4 text-lg font-extrabold text-muted-foreground'>
							{landingCopy.differentiator.others.title}
						</h3>
						<ul className='space-y-3'>
							{landingCopy.differentiator.others.points.map((point) => (
								<li
									key={point}
									className='flex items-center gap-2 text-sm text-muted-foreground'
								>
									<X className='size-4 shrink-0 text-destructive/80' />
									{point}
								</li>
							))}
						</ul>
					</Card.Content>
				</Card.Root>
				<Card.Root className='border-primary/40 bg-primary/5'>
					<Card.Content className='p-6 md:p-8'>
						<h3 className='mb-4 text-lg font-extrabold'>
							{landingCopy.differentiator.invoiced.title}
						</h3>
						<ul className='space-y-3'>
							{landingCopy.differentiator.invoiced.points.map((point) => (
								<li
									key={point}
									className='flex items-center gap-2 text-sm font-medium'
								>
									<Check className='size-4 shrink-0 text-primary-muted' />
									{point}
								</li>
							))}
						</ul>
					</Card.Content>
				</Card.Root>
			</motion.div>
		</LandingSection>
	);
};
