import { getEditContractByIdQueryOptions } from '@/api/contract/getEditContractById';
import { addressFormWithCountrySchema } from '@/components/address-form';
import { clientT } from '@/utils/languageUtils';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';

export const contractRoleFormSchema = z.object({
	description: z.string().min(1),
	rate: z.number().min(1),
});

export const contractClientFormSchema = z.object({
	companyName: z.string().min(1),
	responsibleName: z.string().min(1),
	responsibleEmail: z.email(),
	address: addressFormWithCountrySchema,
});

export const contractAutoSendConfigurationItemFormSchema = z.object({
	dayOfMonth: z.number().int().min(1).max(31),
	percentage: z.number().min(1).max(100),
});
export type ContractAutoSendConfigurationItemForm = z.infer<
	typeof contractAutoSendConfigurationItemFormSchema
>;

export const contractAutoSendConfigurationFormSchema = z
	.object({
		enabled: z.boolean(),
		items: z.array(contractAutoSendConfigurationItemFormSchema),
	})
	.transform((data) => {
		if (!data.enabled) {
			return {
				...data,
				items: [],
			};
		}

		return data;
	})
	.superRefine((data, ctx) => {
		if (data.enabled) {
			if (data.items.length === 0) {
				ctx.addIssue({
					code: 'too_small',
					minimum: 1,
					origin: 'array',
					path: ['items'],
					message: clientT(
						'contracts.form.autoSendConfiguration.atLeastOneItemRequired',
					),
				});
			}

			const totalPercentage = data.items.reduce(
				(acc, item) => acc + item.percentage,
				0,
			);
			if (totalPercentage !== 100) {
				ctx.addIssue({
					code: 'too_big',
					maximum: 100,
					origin: 'number',
					path: ['items', 'percentage'],
					message: clientT(
						'contracts.form.autoSendConfiguration.percentageMustBe100',
					),
				});
			}

			const conflictingDays = data.items.filter((item, index) =>
				data.items.some(
					(otherItem, otherIndex) =>
						otherIndex !== index && item.dayOfMonth === otherItem.dayOfMonth,
				),
			);
			if (conflictingDays.length > 0) {
				ctx.addIssue({
					code: 'custom',
					path: ['items'],
					message: clientT(
						'contracts.form.autoSendConfiguration.conflictingDaysLabel',
						{
							days: conflictingDays.map((item) => item.dayOfMonth).join(', '),
						},
					),
				});
			}
		}
	});
export type ContractAutoSendConfigurationForm = z.infer<
	typeof contractAutoSendConfigurationFormSchema
>;

export const contractsUpsertFormSchema = z.object({
	role: contractRoleFormSchema,
	client: contractClientFormSchema,
	autoSendConfiguration: contractAutoSendConfigurationFormSchema,
});

export type ContractsUpsertFormSchema = z.infer<
	typeof contractsUpsertFormSchema
>;

export const useContractsUpsertFormDefaultValues = ({
	editId,
}: {
	editId?: string;
}) => {
	const { data: editContract, isFetching } = useQuery({
		...getEditContractByIdQueryOptions({ id: editId ?? '' }),
		enabled: !!editId,
	});

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
			autoSendConfiguration: {
				enabled: editContract?.autoSendConfiguration.enabled ?? false,
				items:
					editContract?.autoSendConfiguration.items.map((item) => ({
						dayOfMonth: item.dayOfMonth,
						percentage: item.percentage,
					})) ?? [],
			},
		} satisfies ContractsUpsertFormSchema,
		isLoadingEditContract: isFetching,
	};
};
