import { getEditContractByIdQueryOptions } from '@/api/contract/getEditContractById';
import { clientT } from '@/utils/languageUtils';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';

const contractRoleFormSchema = z.object({
	description: z.string().min(1),
	rate: z.number().min(0),
});

const contractClientFormSchema = z.object({
	companyName: z.string().min(1),
	responsibleName: z.string().min(1),
	responsibleEmail: z.email(),
});

const contractAutoSendConfigurationItemFormSchema = z.object({
	dayOfMonth: z.number().int().min(1).max(31),
	percentage: z.number().min(1).max(100),
});

const contractAutoSendConfigurationFormSchema = z
	.object({
		enabled: z.boolean(),
		items: z.array(contractAutoSendConfigurationItemFormSchema),
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

const contractGeneralFormSchema = z.object({
	description: z.string().min(1),
});

export const contractsUpsertFormSchema = z.object({
	general: contractGeneralFormSchema,
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

	if (editContract) {
		return { defaultValues: editContract, isLoadingEditContract: isFetching };
	}

	return {
		defaultValues: {
			general: {
				description: '',
			},
			role: {
				description: '',
				rate: undefined as unknown as number,
			},
			client: {
				companyName: '',
				responsibleName: '',
				responsibleEmail: '',
			},
			autoSendConfiguration: {
				enabled: false,
				items: [
					{
						dayOfMonth: 1,
						percentage: 100,
					},
				],
			},
		},
	};
};
