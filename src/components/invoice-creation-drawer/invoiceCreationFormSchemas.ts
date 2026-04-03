import z from 'zod';
import type { GetContractsResponse } from '@/api/contract/getContracts';
import { translate } from '@/translations/translate';
import { getLanguage } from '@/utils/languageUtils';
import { getClosestFutureRecurrenceItem, getRecurrenceItemDate } from './utils';

const invoiceItemsFormSchema = z.object({
	description: z.string().min(1),
	amount: z.number().min(1),
});

export const invoiceCreationModeSchema = z.enum(['from-recurrence', 'custom']);
export type InvoiceCreationMode = z.infer<typeof invoiceCreationModeSchema>;

export const invoiceCreationFormSchema = z
	.object({
		mode: invoiceCreationModeSchema,
		recurrenceId: z.string().min(1),
		issueDate: z.date(),
		items: z.array(invoiceItemsFormSchema),
	})
	.superRefine((data, ctx) => {
		if (data.mode === 'from-recurrence') {
			return;
		}

		if (data.items.length === 0) {
			ctx.addIssue({
				code: 'custom',
				path: ['items'],
				message: translate(
					getLanguage(),
					'invoices.creation.validation.itemsRequiredInCustomMode',
				),
			});
		}
	});

type InvoiceCreationFormSchema = z.infer<typeof invoiceCreationFormSchema>;

type UseInvoiceCreationFormDefaultValuesParams = {
	contractData: GetContractsResponse[number];
};
export const useInvoiceCreationFormDefaultValues = ({
	contractData,
}: UseInvoiceCreationFormDefaultValuesParams) => {
	const { closestRecurrenceItem } = getClosestFutureRecurrenceItem({
		recurrenceItems: contractData.invoiceRecurrence.items,
	});
	const { recurrenceDate } = getRecurrenceItemDate({
		recurrenceItem: closestRecurrenceItem,
	});

	return {
		defaultValues: {
			mode: 'from-recurrence',
			recurrenceId: closestRecurrenceItem.id,
			issueDate: recurrenceDate,
			items: [],
		} satisfies InvoiceCreationFormSchema as InvoiceCreationFormSchema,
	};
};
