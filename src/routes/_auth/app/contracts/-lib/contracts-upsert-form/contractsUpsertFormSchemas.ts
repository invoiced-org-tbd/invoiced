import { getEditContractQueryOptions } from '@/api/contract/getEditContract';
import { addressFormWithCountrySchema } from '@/components/address-form/addressFormSchemas';
import { translate } from '@/translations/translate';
import { getLanguage } from '@/utils/languageUtils';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';
import {
	getContractRecurrenceItemsConflictingDays,
	getContractRecurrenceItemsTotalPercentage,
} from './utils';

const contractRoleFormSchema = z.object({
	description: z.string().min(1),
	rate: z.number().min(1),
});

const contractClientFormSchema = z.object({
	companyName: z.string().min(1),
	responsibleName: z.string().min(1),
	responsibleEmail: z.email(),
	address: addressFormWithCountrySchema,
});

const contractInvoiceRecurrenceItemFormSchema = z.object({
	dayOfMonth: z.number().min(1).max(31),
	percentage: z.number().min(1).max(100),
});
export type ContractInvoiceRecurrenceItemFormSchema = z.infer<
	typeof contractInvoiceRecurrenceItemFormSchema
>;

const contractInvoiceRecurrenceFormSchema = z
	.object({
		items: z.array(contractInvoiceRecurrenceItemFormSchema).min(1),
	})
	.superRefine((data, ctx) => {
		const { totalPercentage } = getContractRecurrenceItemsTotalPercentage(
			data.items,
		);
		if (totalPercentage !== 100) {
			ctx.addIssue({
				code: 'custom',
				message: translate(
					getLanguage(),
					'contracts.form.invoiceRecurrence.validation.totalPercentageMustBe100',
				),
				path: ['items'],
			});
		}

		const { conflictingDays, conflictingIndexes } =
			getContractRecurrenceItemsConflictingDays(data.items);
		if (conflictingDays.length > 0) {
			for (const index of conflictingIndexes) {
				ctx.addIssue({
					code: 'custom',
					message: translate(
						getLanguage(),
						'contracts.form.invoiceRecurrence.validation.duplicateDayOfMonth',
					),
					path: ['items', index, 'dayOfMonth'],
				});
			}
		}
	});

const contractAutoSendFormSchema = z
	.object({
		enabled: z.boolean(),
		smtpConfigId: z.string(),
		emailTemplateId: z.string(),
	})
	.superRefine((data, ctx) => {
		if (!data.enabled) {
			return;
		}

		if (!data.smtpConfigId.trim()) {
			ctx.addIssue({
				code: 'custom',
				message: translate(
					getLanguage(),
					'contracts.form.autoSend.validation.smtpRequired',
				),
				path: ['smtpConfigId'],
			});
		}

		if (!data.emailTemplateId.trim()) {
			ctx.addIssue({
				code: 'custom',
				message: translate(
					getLanguage(),
					'contracts.form.autoSend.validation.templateRequired',
				),
				path: ['emailTemplateId'],
			});
		}
	});

export const contractsUpsertFormSchema = z.object({
	role: contractRoleFormSchema,
	client: contractClientFormSchema,
	invoiceRecurrence: contractInvoiceRecurrenceFormSchema,
	autoSend: contractAutoSendFormSchema,
});

export type ContractsUpsertFormSchema = z.infer<
	typeof contractsUpsertFormSchema
>;

export const getEmptyContractInvoiceRecurrenceItem = (dayOfMonth = 1) =>
	({
		dayOfMonth,
		percentage: 100,
	}) satisfies ContractInvoiceRecurrenceItemFormSchema;

type UseContractsUpsertFormDefaultValuesParams = {
	selectedContractId: string;
	isEditing?: boolean;
};
export const useContractsUpsertFormDefaultValues = ({
	selectedContractId,
	isEditing,
}: UseContractsUpsertFormDefaultValuesParams) => {
	const { data, isFetching } = useQuery({
		...getEditContractQueryOptions({
			id: selectedContractId,
		}),
		enabled: !!isEditing,
	});

	const editContract = isEditing ? data : undefined;

	return {
		defaultValues: {
			role: {
				description: editContract?.role.description ?? '',
				rate: editContract?.role.rate ?? (undefined as unknown as number),
			},
			client: {
				companyName: editContract?.client.companyName ?? '',
				responsibleName: editContract?.client.responsibleName ?? '',
				responsibleEmail: editContract?.client.responsibleEmail ?? '',
				address: {
					street1: editContract?.client.address.street1 ?? '',
					street2: editContract?.client.address.street2 ?? '',
					number: editContract?.client.address.number ?? '',
					postalCode: editContract?.client.address.postalCode ?? '',
					city: editContract?.client.address.city ?? '',
					state: editContract?.client.address.state ?? '',
					country: editContract?.client.address.country ?? 'us',
				},
			},
			invoiceRecurrence: {
				items: editContract?.invoiceRecurrence.items ?? [
					getEmptyContractInvoiceRecurrenceItem(),
				],
			},
			autoSend: {
				enabled: editContract?.autoSend.enabled ?? false,
				smtpConfigId: editContract?.autoSend.smtpConfigId ?? '',
				emailTemplateId: editContract?.autoSend.emailTemplateId ?? '',
			},
		} satisfies ContractsUpsertFormSchema,
		isLoadingEditContract: isFetching,
	};
};
