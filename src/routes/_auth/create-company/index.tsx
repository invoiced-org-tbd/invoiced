import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/button';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { ChevronLeftIcon } from 'lucide-react';
import { useLogOut } from '@/hooks/use-log-out';
import { CreateCompanyForm } from './-lib/components/create-company-form';

export const Route = createFileRoute('/_auth/create-company/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { handleLogOut } = useLogOut();
	const { t } = useTranslate();

	return (
		<div className='h-screen w-full overflow-hidden flex items-center justify-center'>
			<div
				className='absolute inset-0 bg-cover bg-center blur-md -z-10'
				style={{ backgroundImage: "url('/soft-green-bg.png')" }}
			/>

			<div className='h-min w-[80%] flex p-3 rounded-2xl bg-background shadow-xl'>
				<section className='hidden w-5/12 bg-muted md:block lg:w-5/8'>
					<img
						src='/soft-green-bg.png'
						alt={t('createCompany.backgroundAlt')}
						className='h-full w-full object-cover rounded-xl'
					/>
				</section>

				<section className='flex w-full flex-col justify-center px-12 py-6 items-center'>
					<div className='max-w-lg w-full flex flex-col gap-10'>
						<div className='w-full'>
							<Button
								variant='secondary'
								size='sm'
								className='w-fit'
								isGhost={true}
								onClick={() => handleLogOut()}
							>
								<ChevronLeftIcon className='size-4' />
								<span>{t('common.goBack')}</span>
							</Button>
						</div>

						<header className='text-center flex flex-col items-center'>
							<img
								src='/logo.png'
								alt={t('createCompany.logoAlt')}
								className='size-20'
							/>
							<h1 className='text-2xl font-semibold text-foreground'>
								{t('createCompany.title')}
							</h1>
							<p className='text-sm text-muted-foreground'>
								{t('createCompany.description')}
							</p>
						</header>

						<CreateCompanyForm />
					</div>
				</section>
			</div>
		</div>
	);
}
