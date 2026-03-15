import { Button } from '@/components/button';
import { authClient } from '@/lib/authClient';
import { appConfig } from '@/utils/appConfig';
import type { LinkProps } from '@tanstack/react-router';

export const LandingPage = () => {
	const handleGoogleSignIn = async () => {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/app' satisfies LinkProps['to'],
		});
	};

	return (
		<div className='h-screen w-full overflow-hidden flex items-center justify-center'>
			<div
				className='absolute inset-0 bg-cover bg-center blur-md -z-10'
				style={{ backgroundImage: "url('/soft-green-bg.png')" }}
			/>

			<div className='h-min w-[80%] flex p-3 rounded-2xl bg-background/90 shadow-xl'>
				<section className='hidden w-5/12 bg-muted md:block lg:w-5/8'>
					<img
						src='/soft-green-bg.png'
						alt='Soft green abstract background'
						className='h-full w-full object-cover rounded-xl'
					/>
				</section>

				<section className='flex w-full flex-col justify-center px-12 py-6 items-center'>
					<div className='max-w-lg w-full flex flex-col items-center gap-10'>
						<header className='text-center flex flex-col items-center'>
							<img
								src='/logo.png'
								alt={appConfig.appName}
								className='size-20'
							/>
							<h1 className='text-2xl font-semibold text-foreground'>
								{appConfig.appName}
							</h1>
							<p className='text-sm text-muted-foreground'>
								{appConfig.appTagline}
							</p>
						</header>

						<Button
							onClick={handleGoogleSignIn}
							size='md'
							className='mt-6 w-full'
						>
							Sign in with Google
						</Button>

						<p className='mt-4 text-center text-xs text-muted-foreground'>
							By continuing, you agree to your app&apos;s terms and privacy
							policy.
						</p>
					</div>
				</section>
			</div>
		</div>
	);
};
