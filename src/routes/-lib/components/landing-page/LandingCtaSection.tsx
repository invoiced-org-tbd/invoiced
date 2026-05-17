import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion/usePrefersReducedMotion';
import { getMotionProps, scaleIn } from './landingMotion';
import { landingCopy } from './landingCopy';
import { LandingSection } from './LandingSection';
import type { LandingSectionActionProps } from './landingSectionTypes';

export const LandingCtaSection = ({
	isRedirecting,
	onGoogleSignIn,
}: LandingSectionActionProps) => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const motionProps = getMotionProps(prefersReducedMotion);

	return (
		<LandingSection animate={false}>
			<motion.div
				variants={scaleIn}
				{...motionProps}
			>
				<Card.Root className='border-0 bg-primary text-primary-foreground'>
					<Card.Content className='px-6 py-14 text-center md:px-12 md:py-16'>
						<h2 className='text-3xl font-extrabold tracking-tight text-balance md:text-4xl'>
							{landingCopy.cta.title}
						</h2>
						<p className='mx-auto mt-4 max-w-xl text-lg text-primary-foreground/85'>
							{landingCopy.cta.supporting}
						</p>
						<div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
							<Button
								size='lg'
								variant='secondary'
								onClick={onGoogleSignIn}
								isLoading={isRedirecting}
								className='w-full sm:w-auto'
							>
								{landingCopy.cta.primaryCta}
								<ArrowRight className='ml-2 size-4' />
							</Button>
							<Button
								size='lg'
								isOutlined
								variant='secondary'
								onClick={onGoogleSignIn}
								isLoading={isRedirecting}
								className='w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto'
							>
								{landingCopy.cta.secondaryCta}
							</Button>
						</div>
					</Card.Content>
				</Card.Root>
			</motion.div>
		</LandingSection>
	);
};
