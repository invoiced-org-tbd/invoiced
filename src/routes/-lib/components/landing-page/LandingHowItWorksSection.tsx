const steps = [
	{
		step: '1',
		title: 'Crie sua conta',
		description:
			'Entre com sua conta Google e configure os dados da sua empresa PJ.',
	},
	{
		step: '2',
		title: 'Cadastre contratos',
		description:
			'Adicione seus contratos ativos com valores e informações dos clientes.',
	},
	{
		step: '3',
		title: 'Automatize envios',
		description:
			'Configure quando e como suas notas devem ser enviadas automaticamente.',
	},
];

export const LandingHowItWorksSection = () => {
	return (
		<section
			id='how-it-works'
			className='py-24 bg-muted/30'
		>
			<div className='container mx-auto px-4'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl md:text-4xl font-semibold mb-4'>
						Como funciona
					</h2>
					<p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
						Comece a usar em menos de 5 minutos.
					</p>
				</div>

				<div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
					{steps.map((item) => (
						<div
							key={item.step}
							className='text-center'
						>
							<div className='size-12 rounded-full bg-primary text-primary-foreground font-semibold text-lg flex items-center justify-center mx-auto mb-4'>
								{item.step}
							</div>
							<h3 className='font-semibold text-lg mb-2'>{item.title}</h3>
							<p className='text-muted-foreground text-sm'>
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
