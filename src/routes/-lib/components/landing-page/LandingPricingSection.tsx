import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion/usePrefersReducedMotion';
import { cn } from '@/utils/classNamesUtils';
import {
	getMotionProps,
	scaleIn,
	staggerContainer,
	staggerItem,
} from './landingMotion';
import { landingCopy } from './landingCopy';
import { LandingSection } from './LandingSection';
import { LandingSectionHeader } from './LandingSectionHeader';
import type { LandingSectionActionProps } from './landingSectionTypes';

export const LandingPricingSection = ({
	isRedirecting,
	onGoogleSignIn,
}: LandingSectionActionProps) => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const motionProps = getMotionProps(prefersReducedMotion);

	return (
		<LandingSection
			id='pricing'
			animate={false}
		>
			<LandingSectionHeader title={landingCopy.pricing.title} />
			<motion.div
				className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-3'
				variants={staggerContainer(0.1)}
				{...motionProps}
			>
				{landingCopy.pricing.plans.map((plan) => (
					<motion.div
						key={plan.name}
						variants={
							prefersReducedMotion
								? undefined
								: plan.highlighted
									? scaleIn
									: staggerItem
						}
						className='flex'
					>
						<Card.Root
							className={cn(
								'relative flex w-full flex-col justify-between',
								plan.highlighted && 'border-primary',
							)}
						>
							{plan.highlighted && (
								<span className='absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground'>
									{landingCopy.pricing.highlightedLabel}
								</span>
							)}
							<Card.Header>
								<p className='text-sm font-semibold text-muted-foreground'>
									{plan.name}
								</p>
								<Card.Title className='flex items-end gap-1'>
									<span className='text-3xl font-extrabold'>{plan.price}</span>
									{plan.period && (
										<span className='text-sm font-medium text-muted-foreground'>
											{plan.period}
										</span>
									)}
								</Card.Title>
								<Card.Description>{plan.description}</Card.Description>
							</Card.Header>
							<Card.Content className='space-y-3'>
								{plan.features.map((feature) => (
									<div
										key={feature}
										className='flex items-center gap-2 text-sm'
									>
										<CheckCircle2 className='size-4 shrink-0 text-primary-muted' />
										<span>{feature}</span>
									</div>
								))}
							</Card.Content>
							<Card.Footer>
								<Button
									size='md'
									className='w-full'
									variant={plan.highlighted ? 'primary' : 'secondary'}
									onClick={onGoogleSignIn}
									isLoading={isRedirecting}
								>
									{plan.ctaLabel}
								</Button>
							</Card.Footer>
						</Card.Root>
					</motion.div>
				))}
			</motion.div>
		</LandingSection>
	);
};
