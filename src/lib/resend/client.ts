import '@tanstack/react-start/server-only';

import { Resend } from 'resend';
import { envServer } from '@/lib/envServer';

let resendClient: Resend | undefined;

export const getResend = (): Resend | null => {
	const key = envServer.RESEND_API_KEY?.trim();
	if (!key) {
		return null;
	}
	if (!resendClient) {
		resendClient = new Resend(key);
	}
	return resendClient;
};
