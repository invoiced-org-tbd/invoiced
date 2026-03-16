import { getEditContractByIdQueryOptions } from '@/api/contract/getEditContractById';
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

const contractAutoSendConfigurationFormSchema = z.object({
	enabled: z.boolean(),
	items: z.array(contractAutoSendConfigurationItemFormSchema),
});

export const contractsUpsertFormSchema = z.object({
	description: z.string().min(1),
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
			description: '',
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
