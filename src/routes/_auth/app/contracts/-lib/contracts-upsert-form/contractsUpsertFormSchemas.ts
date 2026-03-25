import { getEditContractQueryOptions } from '@/api/contract/getEditContract';
import { addressFormWithCountrySchema } from '@/components/address-form/addressFormSchemas';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';

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

export const contractsUpsertFormSchema = z.object({
	role: contractRoleFormSchema,
	client: contractClientFormSchema,
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
		...getEditContractQueryOptions({ id: editId ?? '' }),
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
		} satisfies ContractsUpsertFormSchema,
		isLoadingEditContract: isFetching,
	};
};
