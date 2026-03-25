import { Card } from '@/components/card/Card';
import { Building2, Clock, FileText, Send, Shield, Zap } from 'lucide-react';

const features = [
	{
		icon: Building2,
		title: 'Perfil da empresa',
		description:
			'Configure os dados da sua empresa uma vez e use em todas as suas notas fiscais.',
	},
	{
		icon: FileText,
		title: 'Gestão de contratos',
		description:
			'Cadastre seus contratos com valores, datas de vencimento e informações do cliente.',
	},
	{
		icon: Send,
		title: 'Envio automático',
		description:
			'Configure lembretes e envios automáticos de notas para seus clientes.',
	},
	{
		icon: Clock,
		title: 'Histórico completo',
		description:
			'Acompanhe todas as notas emitidas com filtros por período, cliente e status.',
	},
	{
		icon: Shield,
		title: 'Segurança total',
		description:
			'Seus dados protegidos com criptografia e backup automático na nuvem.',
	},
	{
		icon: Zap,
		title: 'Interface rápida',
		description:
			'Design moderno e intuitivo para você focar no que importa: seu trabalho.',
	},
];

export const LandingFeaturesSection = () => {
	return (
		<section
			id='features'
			className='py-24'
		>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-semibold mb-4'>
						Tudo que você precisa para faturar
					</h2>
					<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
						Funcionalidades pensadas para simplificar a vida do profissional PJ
						brasileiro.
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{features.map((feature) => (
						<Card.Root
							key={feature.title}
							className='border-border/50 bg-card/50'
						>
							<Card.Content className='pt-6'>
								<div className='flex items-center gap-4 mb-4'>
									<div className='size-10 text-primary bg-primary/10 rounded-md flex items-center justify-center'>
										<feature.icon className='size-5' />
									</div>
									<h3 className='font-semibold text-lg'>{feature.title}</h3>
								</div>
								<p className='text-muted-foreground text-sm'>
									{feature.description}
								</p>
							</Card.Content>
						</Card.Root>
					))}
				</div>
			</div>
		</section>
	);
};
