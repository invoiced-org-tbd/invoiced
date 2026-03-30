import { db } from '@/db/client';
import { contractClientAddressTable } from '@/db/tables/contractClientAddressTable';
import { contractClientTable } from '@/db/tables/contractClientTable';
import { contractRoleTable } from '@/db/tables/contractRoleTable';
import { contractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
	ServerError,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { eq } from 'drizzle-orm';
import z from 'zod';
import { contractQueryKeys } from './contractApiUtils';
import { getServerT } from '@/utils/languageUtils';
import { sessionMiddleware } from '../sessionMiddleware';
import { contractInvoiceRecurrenceItemTable } from '@/db/tables/contractInvoiceRecurrenceItemTable';
import { contractAutoSendTable } from '@/db/tables/contractAutoSendTable';
import { assertContractAutoSendResourcesOwned } from './assertContractAutoSendResourcesOwned';

const updateContractParams = z.object({
	editId: z.string(),
	data: contractsUpsertFormSchema,
});

type UpdateContractParams = z.infer<typeof updateContractParams>;

const updateContractServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(updateContractParams)
	.handler(async ({ data: { data, editId }, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			await db.transaction(async (tx) => {
				const contract = await tx.query.contractTable.findFirst({
					where: {
						id: editId,
						userId: user.id,
					},
				});

				if (!contract) {
					throw new ServerError({
						message: t('entity.notFound', {
							entity: t('contracts.name'),
						}),
					});
				}

				await tx
					.update(contractRoleTable)
					.set({
						description: data.role.description,
						rate: data.role.rate,
					})
					.where(eq(contractRoleTable.contractId, contract.id));

				const [contractClient] = await tx
					.update(contractClientTable)
					.set({
						companyName: data.client.companyName,
						responsibleName: data.client.responsibleName,
						responsibleEmail: data.client.responsibleEmail,
					})
					.where(eq(contractClientTable.contractId, contract.id))
					.returning();

				if (!contractClient) {
					throw new ServerError({
						message: t('entity.notFound', {
							entity: t('contracts.name'),
						}),
					});
				}

				await tx
					.delete(contractClientAddressTable)
					.where(
						eq(contractClientAddressTable.contractClientId, contractClient.id),
					);

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

				const invoiceRecurrence =
					await tx.query.contractInvoiceRecurrenceTable.findFirst({
						where: {
							contractId: contract.id,
						},
					});

				if (!invoiceRecurrence) {
					throw new ServerError({
						message: t('entity.notFound', {
							entity: t('contracts.name'),
						}),
					});
				}

				await tx
					.delete(contractInvoiceRecurrenceItemTable)
					.where(
						eq(
							contractInvoiceRecurrenceItemTable.contractInvoiceRecurrenceId,
							invoiceRecurrence.id,
						),
					);

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

					const existingAutoSend =
						await tx.query.contractAutoSendTable.findFirst({
							where: {
								contractId: contract.id,
							},
						});

					if (existingAutoSend) {
						await tx
							.update(contractAutoSendTable)
							.set({
								smtpConfigId,
								emailTemplateId,
							})
							.where(eq(contractAutoSendTable.contractId, contract.id));
					} else {
						await tx.insert(contractAutoSendTable).values({
							contractId: contract.id,
							smtpConfigId,
							emailTemplateId,
						});
					}
				} else {
					await tx
						.delete(contractAutoSendTable)
						.where(eq(contractAutoSendTable.contractId, contract.id));
				}
			});

			return createSuccessResponse();
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const updateContractMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: UpdateContractParams) =>
			updateContractServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [contractQueryKeys.base()],
			});
		},
	});
