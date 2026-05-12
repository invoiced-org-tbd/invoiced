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

export type InvoiceConfigurationFormSchema = z.infer<
	typeof invoiceConfigurationFormSchema
>;

export const mapInvoiceConfigurationRowToFormValues = (row: {
	prefix: string;
	suffix: string | null;
	withYear: boolean;
	withMonth: boolean;
	withDay: boolean;
	withCompanyName: boolean;
	lastInvoiceNumber: number;
}): InvoiceConfigurationFormSchema => ({
	prefix: row.prefix,
	suffix: row.suffix ?? '',
	withYear: row.withYear,
	withMonth: row.withMonth,
	withDay: row.withDay,
	withCompanyName: row.withCompanyName,
	lastInvoiceNumber: row.lastInvoiceNumber,
	invoiceNumberingMode: row.lastInvoiceNumber === 0 ? 'new' : 'existing',
});

export const invoiceConfigurationFormDefaultValues = {
	prefix: 'INV',
	suffix: '',
	withYear: true,
	withMonth: true,
	withDay: true,
	withCompanyName: true,
	lastInvoiceNumber: 0,
	invoiceNumberingMode: 'new',
} satisfies InvoiceConfigurationFormSchema as InvoiceConfigurationFormSchema;
