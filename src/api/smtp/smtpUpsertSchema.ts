import z from 'zod';

export const smtpSecuritySchema = z.enum(['none', 'ssl_tls', 'starttls']);

export const smtpUpsertSchema = z.object({
	name: z.string().min(1),
	host: z.string().min(1),
	port: z.number().int().min(1).max(65535),
	security: smtpSecuritySchema,
	username: z.string().min(1),
	password: z.string().min(1).optional(),
	fromName: z.string().optional(),
	fromEmail: z.email(),
});

export type SmtpUpsertSchema = z.infer<typeof smtpUpsertSchema>;
