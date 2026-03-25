import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { LandingSectionActionProps } from './landingSectionTypes';

export const LandingCtaSection = ({
	isRedirecting,
	onGoogleSignIn,
}: LandingSectionActionProps) => {
	return (
		<section className='py-24'>
			<div className='container mx-auto px-4'>
				<Card.Root className='bg-primary text-primary-foreground border-0'>
					<Card.Content className='py-16 text-center'>
						<h2 className='text-3xl md:text-4xl font-semibold mb-4'>
							Pronto para simplificar seu faturamento?
						</h2>
						<p className='text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto'>
							Junte-se a milhares de profissionais PJ que já usam o Invoiced.
						</p>
						<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
							<Button
								size='lg'
								variant='secondary'
								onClick={onGoogleSignIn}
								isLoading={isRedirecting}
							>
								Criar conta grátis
								<ArrowRight className='ml-2 size-4' />
							</Button>
						</div>
						<div className='flex items-center justify-center gap-6 mt-8 text-sm text-primary-foreground/70'>
							<span className='flex items-center gap-1.5'>
								<CheckCircle2 className='size-4' />
								Sem cartão de crédito
							</span>
							<span className='flex items-center gap-1.5'>
								<CheckCircle2 className='size-4' />
								Cancele quando quiser
							</span>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		</section>
	);
};
