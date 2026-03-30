import z from 'zod';

export const emailTemplateUpsertSchema = z.object({
	name: z.string().min(1),
	slug: z.string().min(1),
	subject: z.string().min(1),
	body: z.string().min(1),
});

export type EmailTemplateUpsertSchema = z.infer<
	typeof emailTemplateUpsertSchema
>;
