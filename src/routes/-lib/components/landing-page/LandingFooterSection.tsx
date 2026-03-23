import { FileText } from 'lucide-react';

export const LandingFooterSection = () => {
	return (
		<footer className='py-12 border-t border-border/40'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col md:flex-row items-center justify-between gap-4'>
					<div className='flex items-center gap-2'>
						<div className='size-6 rounded bg-primary flex items-center justify-center'>
							<FileText className='size-3 text-primary-foreground' />
						</div>
						<span className='font-semibold'>Invoiced</span>
					</div>
					<p className='text-sm text-muted-foreground'>
						{new Date().getFullYear()} Invoiced. Todos os direitos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
};
