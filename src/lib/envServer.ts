import { z } from 'zod';

const envServerSchema = z.object({
	TURSO_DATABASE_URL: z
		.url('TURSO_DATABASE_URL must be a valid URL')
		.nonempty('TURSO_DATABASE_URL is required'),
	TURSO_AUTH_TOKEN: z.string().nonempty('TURSO_AUTH_TOKEN is required'),
	BETTER_AUTH_URL: z
		.url('BETTER_AUTH_URL must be a valid URL')
		.nonempty('BETTER_AUTH_URL is required'),
	BETTER_AUTH_SECRET: z.string().nonempty('BETTER_AUTH_SECRET is required'),
	GOOGLE_CLIENT_ID: z.string().nonempty('GOOGLE_CLIENT_ID is required'),
	GOOGLE_CLIENT_SECRET: z.string().nonempty('GOOGLE_CLIENT_SECRET is required'),
	/** Required to send invoice emails via Resend. */
	RESEND_API_KEY: z.string().optional(),
	/** Optional. Defaults to onboarding@resend.dev (sandbox). Use a verified domain address in production. */
	RESEND_FROM: z.string().optional(),
});

export const envServer = envServerSchema.parse(process.env);
