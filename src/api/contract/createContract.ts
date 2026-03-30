import { db } from '@/db/client';
import { contractAutoSendTable } from '@/db/tables/contractAutoSendTable';
import { contractClientAddressTable } from '@/db/tables/contractClientAddressTable';
import { contractClientTable } from '@/db/tables/contractClientTable';
import { contractInvoiceRecurrenceItemTable } from '@/db/tables/contractInvoiceRecurrenceItemTable';
import { contractInvoiceRecurrenceTable } from '@/db/tables/contractInvoiceRecurrenceTable';
import { contractRoleTable } from '@/db/tables/contractRoleTable';
import { contractTable } from '@/db/tables/contractTable';
import { contractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import { invoiceConfigurationPersistSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/invoiceConfigurationFormSchemas';
import { getServerT } from '@/utils/languageUtils';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { invoiceConfigurationQueryKeys } from '../invoice-configuration/invoiceConfigurationApiUtils';
import { sessionMiddleware } from '../sessionMiddleware';
import { assertContractAutoSendResourcesOwned } from './assertContractAutoSendResourcesOwned';
import { contractQueryKeys } from './contractApiUtils';
import { setupInvoiceConfiguration } from './utils/setupInvoiceConfiguration';

const createContractParams = z.object({
	data: contractsUpsertFormSchema,
	invoiceConfiguration: invoiceConfigurationPersistSchema.optional(),
});

type CreateContractParams = z.infer<typeof createContractParams>;

const createContractServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(createContractParams)
	.handler(
		async ({
			data: { data, invoiceConfiguration },
			context: { user, language },
		}) => {
			try {
				const t = getServerT(language);

				await db.transaction(async (tx) => {
					await setupInvoiceConfiguration({
						tx,
						t,
						userId: user.id,
						invoiceConfiguration,
					});

					const [contract] = await tx
						.insert(contractTable)
						.values({
							userId: user.id,
						})
						.returning();

					await tx.insert(contractRoleTable).values({
						contractId: contract.id,
						description: data.role.description,
						rate: data.role.rate,
					});

					const [contractClient] = await tx
						.insert(contractClientTable)
						.values({
							contractId: contract.id,
							companyName: data.client.companyName,
							responsibleName: data.client.responsibleName,
							responsibleEmail: data.client.responsibleEmail,
						})
						.returning();

					await tx.insert(contractClientAddressTable).values({
						contractClientId: contractClient.id,
						street1: data.client.address.street1,
						street2: data.client.address.street2 || null,
						number: data.client.address.number,
						postalCode: data.client.address.postalCode,
						city: data.client.address.city,
						state: data.client.address.state,
						country: data.client.address.country,
					});

					const [invoiceRecurrence] = await tx
						.insert(contractInvoiceRecurrenceTable)
						.values({
							contractId: contract.id,
						})
						.returning();
					const recurrenceItems = data.invoiceRecurrence.items.map((item) => ({
						contractInvoiceRecurrenceId: invoiceRecurrence.id,
						dayOfMonth: item.dayOfMonth,
						percentage: item.percentage,
					}));

					await tx
						.insert(contractInvoiceRecurrenceItemTable)
						.values(recurrenceItems);

					if (data.autoSend.enabled) {
						const smtpConfigId = data.autoSend.smtpConfigId;
						const emailTemplateId = data.autoSend.emailTemplateId;

						await assertContractAutoSendResourcesOwned(tx, {
							userId: user.id,
							smtpConfigId,
							emailTemplateId,
							t,
						});

						await tx.insert(contractAutoSendTable).values({
							contractId: contract.id,
							smtpConfigId,
							emailTemplateId,
						});
					}
				});

				return createSuccessResponse();
			} catch (error) {
				throw createErrorResponse({
					error,
				});
			}
		},
	);

export const createContractMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: CreateContractParams) =>
			createContractServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [contractQueryKeys.base()],
			});
			invalidateOnSuccess({
				args,
				keys: [invoiceConfigurationQueryKeys.base()],
			});
		},
	});
