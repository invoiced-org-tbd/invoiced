import { Link } from '@tanstack/react-router';
import { FileText } from 'lucide-react';
import { landingCopy } from './landingCopy';

export const LandingFooterSection = () => {
	return (
		<footer className='border-t border-border py-12'>
			<div className='mx-auto max-w-7xl px-4 md:px-12'>
				<div className='flex flex-col gap-8 md:flex-row md:items-start md:justify-between'>
					<div className='max-w-sm'>
						<div className='mb-3 flex items-center gap-2'>
							<div className='flex size-8 items-center justify-center rounded-xl bg-primary'>
								<FileText className='size-4 text-primary-foreground' />
							</div>
							<span className='text-lg font-extrabold'>Invoiced</span>
						</div>
						<p className='text-sm text-muted-foreground'>
							{landingCopy.footer.brandDescription}
						</p>
					</div>
					<nav className='flex flex-wrap gap-x-6 gap-y-2'>
						{landingCopy.footer.links.map((link) => (
							<Link
								key={link.label}
								to='.'
								hash={link.hash}
								className='text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground'
							>
								{link.label}
							</Link>
						))}
					</nav>
				</div>
				<p className='mt-8 text-center text-xs text-muted-foreground md:text-left'>
					{landingCopy.footer.closing}
				</p>
			</div>
		</footer>
	);
};
