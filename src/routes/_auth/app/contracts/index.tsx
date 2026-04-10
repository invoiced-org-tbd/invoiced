import type { GetContractsResponse } from '@/api/contract/getContracts';
import { getContractsQueryOptions } from '@/api/contract/getContracts';
import { InvoiceCreationDrawer } from '@/components/invoice-creation-drawer/InvoiceCreationDrawer';
import { Page } from '@/components/page/Page';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
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
	isCreatingInvoice: z.boolean().optional(),
	step: contractStepsSchema.optional(),
});
export type ContractsSearchSchema = z.infer<typeof contractsSearchSchema>;

export const Route = createFileRoute('/_auth/app/contracts/')({
	validateSearch: zodValidator(contractsSearchSchema),
	beforeLoad: async ({ context, search }) => {
		const contracts = await context.queryClient.fetchQuery(
			getContractsQueryOptions(),
		);

		if (!contracts.length) {
			if (!Object.keys(search).length) {
				return;
			}

			// if there's no contracts, search should be empty (no creating, editing etc)
			throw Route.redirect({
				to: '.',
				search: {},
			});
		}

		const selectedContract = contracts.find(
			(contract) => contract.id === search.selectedContractId,
		);
		if (!selectedContract) {
			throw Route.redirect({
				to: '.',
				search: {
					selectedContractId: contracts[0].id,
				},
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const { selectedContractId } = Route.useSearch();

	const { t } = useTranslate();
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

	const resolvedContractData =
		contracts.find((contract) => contract.id === selectedContractId) ??
		contracts?.[0];
	const resolvedSelectedContractId = resolvedContractData?.id ?? '';
	const hasContracts = !!resolvedSelectedContractId;

	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>{t('contracts.title')}</Page.Title>
			</Page.Header>

			<Page.Content>
				{hasContracts ? (
					<ContractsList
						contracts={contracts}
						selectedContract={resolvedContractData}
						onSelectContract={handleSelectContract}
						onCreateNewContract={handleCreateNewContract}
					/>
				) : (
					<ContractsZeroState onCreateNewContract={handleCreateNewContract} />
				)}
			</Page.Content>

			<ContractsUpsertDrawer selectedContractId={resolvedSelectedContractId} />
			<ContractsDeleteDialog selectedContractId={resolvedSelectedContractId} />

			<InvoiceCreationDrawer contractData={resolvedContractData} />
		</Page.Root>
	);
}
