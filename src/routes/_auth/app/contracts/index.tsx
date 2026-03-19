import { Page } from '@/components/page';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { createFileRoute } from '@tanstack/react-router';
import { ContractsDataTable } from './-lib/contracts-data-table';
import { getContractsQueryOptions } from '@/api/contract/getContracts';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { ContractsUpsertDrawer } from './-lib/contracts-upsert-drawer';
import { ContractsDeleteDialog } from './-lib/contracts-delete-dialog';

const contractStepsSchema = z.enum([
	'general',
	'role',
	'client',
	'autoSendConfiguration',
]);

export type ContractStep = z.infer<typeof contractStepsSchema>;
const contractsSearchSchema = z.object({
	isCreating: z.boolean().optional(),
	editId: z.string().optional(),
	deleteId: z.string().optional(),
	step: contractStepsSchema.optional(),
});

export const Route = createFileRoute('/_auth/app/contracts/')({
	validateSearch: zodValidator(contractsSearchSchema),
	loader: async ({ context }) => {
		context.queryClient.prefetchQuery(getContractsQueryOptions());
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslate();

	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>{t('contracts.title')}</Page.Title>
			</Page.Header>

			<Page.Content>
				<ContractsDataTable />
			</Page.Content>

			<ContractsUpsertDrawer />
			<ContractsDeleteDialog />
		</Page.Root>
	);
}
