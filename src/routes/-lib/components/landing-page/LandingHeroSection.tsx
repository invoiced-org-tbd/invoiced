import { Button } from '@/components/button';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Zap } from 'lucide-react';
import type { LandingSectionActionProps } from './landingSectionTypes';

export const LandingHeroSection = ({
	isRedirecting,
	onGoogleSignIn,
}: LandingSectionActionProps) => {
	return (
		<section className='py-24 md:py-32'>
			<div className='container mx-auto px-4'>
				<div className='max-w-3xl mx-auto text-center'>
					<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6'>
						<Zap className='size-3.5' />
						Simplifique sua rotina de faturamento
					</div>

					<h1 className='text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance mb-6'>
						Gestão de notas fiscais para{' '}
						<span className='text-primary'>profissionais PJ</span>
					</h1>

					<p className='text-lg md:text-xl text-muted-foreground text-balance mb-10 max-w-2xl mx-auto'>
						Gerencie contratos, configure envios automáticos e mantenha seu
						faturamento organizado em um único lugar. Feito para quem trabalha
						como PJ no Brasil.
					</p>

					<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
						<Button
							size='lg'
							onClick={onGoogleSignIn}
							isLoading={isRedirecting}
							className='w-full sm:w-auto'
						>
							Começar agora
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
								Ver como funciona
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};
