import { Page } from '@/components/page/Page';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { createFileRoute } from '@tanstack/react-router';
import { ContractsSplitView } from './-lib/contracts-split-view/ContractsSplitView';
import { getContractsQueryOptions } from '@/api/contract/getContracts';
import { getEmailTemplatesQueryOptions } from '@/api/email-template/getEmailTemplates';
import { getSmtpConfigsQueryOptions } from '@/api/smtp/getSmtpConfigs';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { ContractsUpsertDrawer } from './-lib/contracts-upsert-drawer/ContractsUpsertDrawer';
import { ContractsDeleteDialog } from './-lib/contracts-delete-dialog/ContractsDeleteDialog';

const contractStepsSchema = z.enum([
	'role',
	'client',
	'invoiceRecurrence',
	'autoSend',
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
		context.queryClient.prefetchQuery(getSmtpConfigsQueryOptions());
		context.queryClient.prefetchQuery(getEmailTemplatesQueryOptions());
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
				<ContractsSplitView />
			</Page.Content>

			<ContractsUpsertDrawer />
			<ContractsDeleteDialog />
		</Page.Root>
	);
}
