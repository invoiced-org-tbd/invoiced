import { authClient } from '@/lib/authClient';
import type { LinkProps } from '@tanstack/react-router';
import { useState } from 'react';
import { LandingHeaderSection } from './LandingHeaderSection';
import { LandingHeroSection } from './LandingHeroSection';
import { LandingStatsSection } from './LandingStatsSection';
import { LandingProblemSection } from './LandingProblemSection';
import { LandingSolutionSection } from './LandingSolutionSection';
import { LandingHowItWorksSection } from './LandingHowItWorksSection';
import { LandingAudienceSection } from './LandingAudienceSection';
import { LandingDifferentiatorSection } from './LandingDifferentiatorSection';
import { LandingPricingSection } from './LandingPricingSection';
import { LandingFaqSection } from './LandingFaqSection';
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
			<main>
				<LandingHeroSection
					isRedirecting={isRedirecting}
					onGoogleSignIn={handleGoogleSignIn}
				/>
				<LandingStatsSection />
				<LandingProblemSection />
				<LandingSolutionSection />
				<LandingHowItWorksSection />
				<LandingAudienceSection />
				<LandingDifferentiatorSection />
				<LandingPricingSection
					isRedirecting={isRedirecting}
					onGoogleSignIn={handleGoogleSignIn}
				/>
				<LandingFaqSection />
				<LandingCtaSection
					isRedirecting={isRedirecting}
					onGoogleSignIn={handleGoogleSignIn}
				/>
			</main>
			<LandingFooterSection />
		</div>
	);
};
