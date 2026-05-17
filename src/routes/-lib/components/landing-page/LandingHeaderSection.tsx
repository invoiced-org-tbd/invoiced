import { Button } from '@/components/button/Button';
import { ThemeSwitcher } from '@/components/theme-switcher/ThemeSwitcher';
import { Link } from '@tanstack/react-router';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion/usePrefersReducedMotion';
import { landingTransition } from './landingMotion';
import { landingCopy } from './landingCopy';
import type { LandingSectionActionProps } from './landingSectionTypes';

export const LandingHeaderSection = ({
	isRedirecting,
	onGoogleSignIn,
}: LandingSectionActionProps) => {
	const prefersReducedMotion = usePrefersReducedMotion();

	return (
		<motion.header
			className='sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80'
			initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
			animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
			transition={landingTransition}
		>
			<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-12'>
				<Link
					to='/'
					className='flex items-center gap-2'
				>
					<div className='flex size-9 items-center justify-center rounded-2xl bg-primary'>
						<FileText className='size-4 text-primary-foreground' />
					</div>
					<span className='text-xl font-extrabold tracking-tight'>
						Invoiced
					</span>
				</Link>

				<nav className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex'>
					{landingCopy.header.nav.map((item) => (
						<Link
							key={item.hash}
							to='.'
							hash={item.hash}
							className='text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground'
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className='flex items-center gap-2'>
					<ThemeSwitcher />
					<div className='hidden items-center gap-2 md:flex'>
						<Button
							variant='secondary'
							size='sm'
							onClick={onGoogleSignIn}
							isLoading={isRedirecting}
						>
							{landingCopy.header.signIn}
						</Button>
						<Button
							size='sm'
							onClick={onGoogleSignIn}
							isLoading={isRedirecting}
						>
							{landingCopy.header.startFree}
						</Button>
					</div>
				</div>
			</div>
		</motion.header>
	);
};
