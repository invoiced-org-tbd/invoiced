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
import { InvoiceCreationDrawer } from '@/components/invoice-creation-drawer/InvoiceCreationDrawer';

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
	isCreatingInvoice: z.boolean().optional(),
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
	const { selectedContractId, isCreatingInvoice } = Route.useSearch();

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

	const handleCreateInvoiceClose = () => {
		navigate({
			search: (prev) => ({
				...prev,
				isCreatingInvoice: undefined,
			}),
		});
	};

	const resolvedContractData =
		contracts.find((contract) => contract.id === selectedContractId) ??
		contracts[0];
	const resolvedSelectedContractId = resolvedContractData.id;
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

			<InvoiceCreationDrawer
				isOpen={!!isCreatingInvoice}
				onClose={handleCreateInvoiceClose}
				contractData={resolvedContractData}
			/>
		</Page.Root>
	);
}
