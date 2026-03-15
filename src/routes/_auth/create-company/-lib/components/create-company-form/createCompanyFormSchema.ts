import z from 'zod';

export const createCompanyFormSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
});

export type CreateCompanyFormSchema = z.infer<typeof createCompanyFormSchema>;

export const useCreateCompanyDefaultValues = (): CreateCompanyFormSchema => {
	return {
		name: '',
		email: '',
	};
};
