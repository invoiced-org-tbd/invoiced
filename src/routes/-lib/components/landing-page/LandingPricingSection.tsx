import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CheckCircle2 } from 'lucide-react';
import type { LandingSectionActionProps } from './landingSectionTypes';
import { cn } from '@/utils/classNamesUtils';

const plans = [
	{
		name: 'Starter',
		price: 'R$ 0',
		description: 'Para começar a organizar seu faturamento PJ.',
		period: '/mês',
		ctaLabel: 'Começar grátis',
		features: [
			'Até 3 contratos ativos',
			'Emissão manual de notas',
			'Lembretes básicos por e-mail',
		],
	},
	{
		name: 'Pro',
		price: 'R$ 39',
		description: 'Ideal para profissionais PJ com rotina recorrente.',
		period: '/mês',
		ctaLabel: 'Escolher Pro',
		features: [
			'Contratos ilimitados',
			'Envio automático de notas',
			'Dashboard com histórico e filtros',
			'Suporte prioritário',
		],
		highlighted: true,
	},
	{
		name: 'Business',
		price: 'R$ 79',
		description: 'Para operações com mais volume e controle.',
		period: '/mês',
		ctaLabel: 'Falar com time',
		features: [
			'Multiempresa',
			'Regras avançadas de automação',
			'Relatórios exportáveis',
			'Acompanhamento dedicado',
		],
	},
];

export const LandingPricingSection = ({
	isRedirecting,
	onGoogleSignIn,
}: LandingSectionActionProps) => {
	return (
		<section
			id='pricing'
			className='py-24'
		>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-semibold mb-4'>
						Planos para cada fase do seu negócio
					</h2>
					<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
						Comece grátis e evolua conforme sua operação de faturamento cresce.
					</p>
				</div>

				<div className='grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
					{plans.map((plan) => (
						<Card.Root
							key={plan.name}
							className={cn(
								'border-secondary',
								plan.highlighted && 'border-primary relative',
								'flex flex-col justify-between',
							)}
						>
							{plan.highlighted && (
								<span className='absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground'>
									Mais escolhido
								</span>
							)}

							<Card.Header>
								<p className='text-sm font-medium text-muted-foreground'>
									{plan.name}
								</p>
								<Card.Title className='flex items-end gap-1'>
									<span className='text-3xl'>{plan.price}</span>
									<span className='text-sm text-muted-foreground font-medium'>
										{plan.period}
									</span>
								</Card.Title>
								<Card.Description>{plan.description}</Card.Description>
							</Card.Header>

							<Card.Content className='space-y-3'>
								{plan.features.map((feature) => (
									<div
										key={feature}
										className='flex items-center gap-2 text-sm'
									>
										<CheckCircle2 className='size-4 text-primary' />
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
					))}
				</div>
			</div>
		</section>
	);
};
