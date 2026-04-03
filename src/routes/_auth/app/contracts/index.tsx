import type { GetContractsResponse } from '@/api/contract/getContracts';
import { getContractsQueryOptions } from '@/api/contract/getContracts';
import { Page } from '@/components/page/Page';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { ContractsDeleteDialog } from './-lib/contracts-delete-dialog/ContractsDeleteDialog';
import { ContractsList } from './-lib/contracts-list/ContractsList';
import { ContractsUpsertDrawer } from './-lib/contracts-upsert-drawer/ContractsUpsertDrawer';
import { ContractsZeroState } from './-lib/contracts-zero-state/ContractsZeroState';

const contractStepsSchema = z.enum([
	'role',
	'client',
	'invoiceRecurrence',
	'autoSend',
]);

export type ContractStep = z.infer<typeof contractStepsSchema>;
const contractsSearchSchema = z.object({
	selectedContractId: z.string().optional(),
	isCreating: z.boolean().optional(),
	isEditing: z.boolean().optional(),
	isDeleting: z.boolean().optional(),
	step: contractStepsSchema.optional(),
});
export type ContractsSearchSchema = z.infer<typeof contractsSearchSchema>;

export const Route = createFileRoute('/_auth/app/contracts/')({
	validateSearch: zodValidator(contractsSearchSchema),
	loader: async ({ context }) => {
		context.queryClient.prefetchQuery(getContractsQueryOptions());
	},
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const { selectedContractId } = Route.useSearch();

	const { data: contracts } = useSuspenseQuery(getContractsQueryOptions());

	const handleCreateNewContract = () => {
		navigate({
			search: (prev) => ({
				...prev,
				isCreating: true,
			}),
		});
	};

	const handleSelectContract = (contract: GetContractsResponse[number]) => {
		navigate({
			search: (prev) => ({
				...prev,
				selectedContractId: contract.id,
			}),
		});
	};

	const resolvedSelectedContractId = selectedContractId ?? contracts?.[0]?.id;
	const hasContracts = !!resolvedSelectedContractId;

	return (
		<Page.Root>
			<Page.Content>
				{hasContracts ? (
					<ContractsList
						contracts={contracts}
						selectedContractId={resolvedSelectedContractId}
						onSelectContract={handleSelectContract}
						onCreateNewContract={handleCreateNewContract}
					/>
				) : (
					<ContractsZeroState onCreateNewContract={handleCreateNewContract} />
				)}
			</Page.Content>

			<ContractsUpsertDrawer selectedContractId={resolvedSelectedContractId} />
			<ContractsDeleteDialog selectedContractId={resolvedSelectedContractId} />
		</Page.Root>
	);
}
