import { deleteContractMutationOptions } from '@/api/contract/deleteContract';
import type { GetContractsResponse } from '@/api/contract/getContracts';
import { getContractsQueryOptions } from '@/api/contract/getContracts';
import { DeleteDialog } from '@/components/delete-dialog/DeleteDialog';
import { InvoiceCreationDrawer } from '@/components/invoice-creation-drawer/InvoiceCreationDrawer';
import { Page } from '@/components/page/Page';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
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
			if (!Object.keys(search).length || search.isCreating) {
				return;
			}

			// With no contracts, only the create flow is allowed in search params
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
	const { isDeleting, selectedContractId } = Route.useSearch();

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

	const handleCloseDeleteDialog = () => {
		navigate({
			search: {},
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
			<DeleteDialog
				title={t('entity.deleteTitle', {
					entity: t('contracts.name'),
				})}
				description={t('entity.deleteConfirmation', {
					entity: t('contracts.name'),
				})}
				selectedId={resolvedSelectedContractId}
				open={!!isDeleting}
				onClose={handleCloseDeleteDialog}
				deleteMutationOptions={deleteContractMutationOptions()}
			/>

			<InvoiceCreationDrawer contractData={resolvedContractData} />
		</Page.Root>
	);
}
