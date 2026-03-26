import z from 'zod';

export const invoiceConfigurationFormSchema = z.object({
	prefix: z.string().min(1),
	suffix: z.string(),
	withYear: z.boolean(),
	withMonth: z.boolean(),
	withDay: z.boolean(),
	withCompanyName: z.boolean(),
	lastInvoiceNumber: z.number().min(1),
});

export type InvoiceConfigurationFormSchema = z.infer<
	typeof invoiceConfigurationFormSchema
>;

export const useInvoiceConfigurationFormDefaultValues = () => {
	return {
		defaultValues: {
			prefix: 'INV-',
			suffix: '',
			withYear: true,
			withMonth: true,
			withDay: true,
			withCompanyName: true,
			lastInvoiceNumber: 0,
		} satisfies InvoiceConfigurationFormSchema as InvoiceConfigurationFormSchema,
	};
};
