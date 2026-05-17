import '@tanstack/react-start/server-only';

import { envServer } from '@/lib/envServer';

/** Resend sandbox sender — only delivers to your Resend account email until you verify a domain. */
export const RESEND_DEFAULT_FROM = 'onboarding@resend.dev';

export const getResendFrom = (): string => {
	const configured = envServer.RESEND_FROM?.trim();
	return configured || RESEND_DEFAULT_FROM;
};
