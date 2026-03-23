const stats = [
	{ value: '2.500+', label: 'Profissionais ativos' },
	{ value: '50k+', label: 'Notas emitidas' },
	{ value: '99.9%', label: 'Uptime garantido' },
	{ value: '4.9/5', label: 'Avaliação média' },
];

export const LandingStatsSection = () => {
	return (
		<section className='py-12 border-y border-border/40 bg-muted/30'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
					{stats.map((stat) => (
						<div
							key={stat.label}
							className='text-center'
						>
							<div className='text-2xl md:text-3xl font-semibold text-foreground'>
								{stat.value}
							</div>
							<div className='text-sm text-muted-foreground mt-1'>
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
