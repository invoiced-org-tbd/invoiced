import { Button } from '@/components/button/Button';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion/usePrefersReducedMotion';
import { staggerContainer, staggerItem } from './landingMotion';
import { landingCopy } from './landingCopy';
import type { LandingSectionActionProps } from './landingSectionTypes';

export const LandingHeroSection = ({
	isRedirecting,
	onGoogleSignIn,
}: LandingSectionActionProps) => {
	const prefersReducedMotion = usePrefersReducedMotion();

	return (
		<section className='py-16 md:py-24 lg:py-28'>
			<motion.div
				className='mx-auto max-w-7xl px-4 md:px-12'
				variants={staggerContainer(0.1)}
				initial={prefersReducedMotion ? false : 'hidden'}
				animate={prefersReducedMotion ? undefined : 'visible'}
			>
				<div className='mx-auto max-w-4xl text-center'>
					<motion.p
						variants={staggerItem}
						className='mb-6 text-sm font-semibold text-muted-foreground'
					>
						{landingCopy.hero.trustLine}
					</motion.p>

					<motion.h1
						variants={staggerItem}
						className='text-4xl font-extrabold tracking-tight text-balance md:text-5xl lg:text-6xl'
					>
						{landingCopy.hero.headline}
					</motion.h1>

					<motion.p
						variants={staggerItem}
						className='mt-6 text-lg text-muted-foreground text-balance md:text-xl'
					>
						{landingCopy.hero.subheadline}
					</motion.p>

					<motion.p
						variants={staggerItem}
						className='mt-4 text-base text-muted-foreground text-balance'
					>
						{landingCopy.hero.supporting}
					</motion.p>

					<motion.div
						variants={staggerItem}
						className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'
					>
						<Button
							size='lg'
							onClick={onGoogleSignIn}
							isLoading={isRedirecting}
							className='w-full sm:w-auto'
						>
							{landingCopy.hero.primaryCta}
							<ArrowRight className='ml-2 size-4' />
						</Button>
						<Button
							size='lg'
							isOutlined
							variant='primary'
							asChild
							className='w-full sm:w-auto'
						>
							<Link
								to='.'
								hash='how-it-works'
							>
								{landingCopy.hero.secondaryCta}
							</Link>
						</Button>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
};
