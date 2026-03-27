import { addressFormSchema } from '@/components/address-form/addressFormSchemas';
import z from 'zod';

const companyGeneralFormSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
});

export const companyUpsertFormSchema = z.object({
	general: companyGeneralFormSchema,
	address: addressFormSchema,
});

export type CompanyUpsertFormSchema = z.infer<typeof companyUpsertFormSchema>;
