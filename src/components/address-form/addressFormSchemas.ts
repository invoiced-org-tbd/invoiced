import { countryCodeEnumSchema } from '@/db/tables/addressTableBase';
import z from 'zod';

export const addressFormSchema = z.object({
	street1: z.string().min(1),
	street2: z.string(),
	number: z.string().min(1),
	postalCode: z.string().min(1),
	city: z.string().min(1),
	state: z.string().min(1),
});

export const addressFormWithCountrySchema = addressFormSchema.extend({
	country: countryCodeEnumSchema,
});
