import { authClient } from '@/lib/authClient';
import type { LinkProps } from '@tanstack/react-router';
import { useState } from 'react';
import { LandingHeaderSection } from './LandingHeaderSection';
import { LandingHeroSection } from './LandingHeroSection';
import { LandingStatsSection } from './LandingStatsSection';
import { LandingFeaturesSection } from './LandingFeaturesSection';
import { LandingHowItWorksSection } from './LandingHowItWorksSection';
import { LandingPricingSection } from './LandingPricingSection';
import { LandingCtaSection } from './LandingCtaSection';
import { LandingFooterSection } from './LandingFooterSection';

export const LandingPage = () => {
	const [isRedirecting, setIsRedirecting] = useState(false);

	const handleGoogleSignIn = async () => {
		if (isRedirecting) {
			return;
		}

		setIsRedirecting(true);

		try {
			await authClient.signIn.social({
				provider: 'google',
				callbackURL: '/app' satisfies LinkProps['to'],
			});
		} finally {
			setIsRedirecting(false);
		}
	};

	return (
		<div className='min-h-screen bg-background'>
			<LandingHeaderSection
				isRedirecting={isRedirecting}
				onGoogleSignIn={handleGoogleSignIn}
			/>
			<LandingHeroSection
				isRedirecting={isRedirecting}
				onGoogleSignIn={handleGoogleSignIn}
			/>
			<LandingStatsSection />
			<LandingFeaturesSection />
			<LandingHowItWorksSection />
			<LandingPricingSection
				isRedirecting={isRedirecting}
				onGoogleSignIn={handleGoogleSignIn}
			/>
			<LandingCtaSection
				isRedirecting={isRedirecting}
				onGoogleSignIn={handleGoogleSignIn}
			/>
			<LandingFooterSection />
		</div>
	);
};
