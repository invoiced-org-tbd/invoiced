import z from 'zod';

const createCompanyGeneralFormSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
});

const createCompanyAddressFormSchema = z.object({
	street1: z.string().min(1),
	street2: z.string(),
	number: z.string().min(1),
	postalCode: z.string().min(1),
	city: z.string().min(1),
	state: z.string().min(1),
});

export const createCompanyFormSchema = z.object({
	general: createCompanyGeneralFormSchema,
	address: createCompanyAddressFormSchema,
});

export type CreateCompanyFormSchema = z.infer<typeof createCompanyFormSchema>;

export const useCreateCompanyDefaultValues = () => {
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
		},
	} satisfies CreateCompanyFormSchema;
};
