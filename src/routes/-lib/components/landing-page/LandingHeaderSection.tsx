import { Button } from '@/components/button/Button';
import { Link } from '@tanstack/react-router';
import { FileText } from 'lucide-react';
import type { LandingSectionActionProps } from './landingSectionTypes';
import { ThemeSwitcher } from '@/components/theme-switcher/ThemeSwitcher';

export const LandingHeaderSection = ({
	isRedirecting,
	onGoogleSignIn,
}: LandingSectionActionProps) => {
	return (
		<header className='border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50'>
			<div className='container mx-auto px-4 h-16 flex items-center justify-between'>
				<Link
					to='/'
					className='flex items-center gap-2'
				>
					<div className='size-8 rounded-lg bg-primary flex items-center justify-center'>
						<FileText className='size-4 text-primary-foreground' />
					</div>
					<span className='text-xl font-semibold'>Invoiced</span>
				</Link>

				<nav className='hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2'>
					<Link
						to='.'
						hash='features'
						className='text-sm text-muted-foreground hover:text-foreground transition-colors'
					>
						Funcionalidades
					</Link>
					<Link
						to='.'
						hash='how-it-works'
						className='text-sm text-muted-foreground hover:text-foreground transition-colors'
					>
						Como funciona
					</Link>
					<Link
						to='.'
						hash='pricing'
						className='text-sm text-muted-foreground hover:text-foreground transition-colors'
					>
						Preços
					</Link>
				</nav>

				<div className='flex items-center gap-2'>
					<ThemeSwitcher />
					<div className='items-center gap-2 hidden md:flex'>
						<Button
							onClick={onGoogleSignIn}
							isLoading={isRedirecting}
							size='sm'
						>
							Entrar
						</Button>
						<Button
							variant='secondary'
							onClick={onGoogleSignIn}
							isLoading={isRedirecting}
						>
							Começar grátis
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};
