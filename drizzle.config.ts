import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { z } from 'zod';

const drizzleEnvSchema = z.object({
	TURSO_DATABASE_URL: z
		.url('TURSO_DATABASE_URL must be a valid URL')
		.nonempty('TURSO_DATABASE_URL is required'),
	TURSO_AUTH_TOKEN: z.string().nonempty('TURSO_AUTH_TOKEN is required'),
});

const drizzleEnv = drizzleEnvSchema.parse(process.env);

// biome-ignore lint/style/noDefaultExport: drizzle-kit expects a default config export
export default defineConfig({
	schema: './src/db/tables/index.ts',
	out: './src/db/migrations',
	dialect: 'turso',
	dbCredentials: {
		url: drizzleEnv.TURSO_DATABASE_URL,
		authToken: drizzleEnv.TURSO_AUTH_TOKEN,
	},
	verbose: true,
	strict: true,
});
