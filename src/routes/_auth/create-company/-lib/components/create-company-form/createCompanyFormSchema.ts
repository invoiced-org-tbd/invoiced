import z from 'zod';

export const createCompanyFormSchema = z.object({
	general: z.object({
		name: z.string().min(1),
		email: z.email(),
	}),
	address: z.object({
		street1: z.string().min(1),
		street2: z.string(),
		number: z.string().min(1),
		postalCode: z.string().min(1),
		city: z.string().min(1),
		state: z.string().min(1),
		country: z.string().min(1),
	}),
});

export type CreateCompanyFormSchema = z.infer<typeof createCompanyFormSchema>;

export type CreateCompanyFormBaseType = CreateCompanyFormSchema;

export const useCreateCompanyDefaultValues = (): CreateCompanyFormSchema => {
	return {
		general: {
			name: '',
			email: '',
		},
		address: {
			street1: '',
			street2: '',
			number: '',
			postalCode: '',
			city: '',
			state: '',
			country: '',
		},
	};
};
