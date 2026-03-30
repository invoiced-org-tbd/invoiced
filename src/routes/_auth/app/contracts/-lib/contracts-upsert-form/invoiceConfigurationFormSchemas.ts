import { translate } from '@/translations/translate';
import { getLanguage } from '@/utils/languageUtils';
import z from 'zod';

const invoiceNumberingModeSchema = z.enum(['new', 'existing']);

export const invoiceConfigurationPersistSchema = z.object({
	prefix: z.string().min(1),
	suffix: z.string(),
	withYear: z.boolean(),
	withMonth: z.boolean(),
	withDay: z.boolean(),
	withCompanyName: z.boolean(),
	lastInvoiceNumber: z.number().int().min(0),
});

export type InvoiceConfigurationPersistSchema = z.infer<
	typeof invoiceConfigurationPersistSchema
>;

export const invoiceConfigurationFormSchema = invoiceConfigurationPersistSchema
	.extend({
		invoiceNumberingMode: invoiceNumberingModeSchema,
	})
	.superRefine((data, ctx) => {
		if (
			data.invoiceNumberingMode === 'existing' &&
			data.lastInvoiceNumber < 1
		) {
			ctx.addIssue({
				code: 'custom',
				path: ['lastInvoiceNumber'],
				message: translate(getLanguage(), 'validation.minNumber', {
					minimum: 1,
				}),
			});
		}
	});

type InvoiceConfigurationFormSchema = z.infer<
	typeof invoiceConfigurationFormSchema
>;

export const useInvoiceConfigurationFormDefaultValues = () => {
	return {
		defaultValues: {
			prefix: 'INV',
			suffix: '',
			withYear: true,
			withMonth: true,
			withDay: true,
			withCompanyName: true,
			lastInvoiceNumber: 0,
			invoiceNumberingMode: 'new',
		} satisfies InvoiceConfigurationFormSchema as InvoiceConfigurationFormSchema,
	};
};
