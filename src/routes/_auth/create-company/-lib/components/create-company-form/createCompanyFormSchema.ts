import z from 'zod';
import { addressFormSchema } from '@/components/address-form/addressFormSchemas';

const createCompanyGeneralFormSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
});

export const createCompanyFormSchema = z.object({
	general: createCompanyGeneralFormSchema,
	address: addressFormSchema,
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
