import z from 'zod';

export const createCompanyFormSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
	street1: z.string().min(1),
	street2: z.string(),
	number: z.string().min(1),
	postalCode: z.string().min(1),
	city: z.string().min(1),
	state: z.string().min(1),
	country: z.string().min(1),
});

export type CreateCompanyFormSchema = z.infer<typeof createCompanyFormSchema>;

export const useCreateCompanyDefaultValues = (): CreateCompanyFormSchema => {
	return {
		name: '',
		email: '',
		street1: '',
		street2: '',
		number: '',
		postalCode: '',
		city: '',
		state: '',
		country: '',
	};
};
