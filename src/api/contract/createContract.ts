import { contractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import {
	createErrorResponse,
	createSuccessResponse,
	ServerError,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { db } from '@/db/client';
import { contractClientAddressTable } from '@/db/tables/contractClientAddressTable';
import { contractClientTable } from '@/db/tables/contractClientTable';
import { contractRoleTable } from '@/db/tables/contractRoleTable';
import { contractTable } from '@/db/tables/contractTable';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import { contractQueryKeys } from './contractApiUtils';
import { sessionMiddleware } from '../sessionMiddleware';
import { contractInvoiceRecurrenceTable } from '@/db/tables/contractInvoiceRecurrenceTable';
import { contractInvoiceRecurrenceItemTable } from '@/db/tables/contractInvoiceRecurrenceItemTable';
import { invoiceConfigurationFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/invoiceConfigurationFormSchemas';
import { invoiceConfigurationTable } from '@/db/tables/invoiceConfigurationTable';

const createContractParams = z.object({
	data: contractsUpsertFormSchema,
	invoiceConfiguration: invoiceConfigurationFormSchema.optional(),
});

type CreateContractParams = z.infer<typeof createContractParams>;

const createContractServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(createContractParams)
	.handler(
		async ({ data: { data, invoiceConfiguration }, context: { user } }) => {
			try {
				await db.transaction(async (tx) => {
					if (invoiceConfiguration) {
						const existingInvoiceConfiguration =
							await tx.query.invoiceConfigurationTable.findFirst({
								where: {
									userId: user.id,
								},
							});

						if (existingInvoiceConfiguration) {
							throw new ServerError({
								message:
									'There is already an invoice configuration for this user.',
							});
						}

						await tx.insert(invoiceConfigurationTable).values({
							userId: user.id,
							prefix: invoiceConfiguration.prefix,
							suffix: invoiceConfiguration.suffix,
							withYear: invoiceConfiguration.withYear,
							withMonth: invoiceConfiguration.withMonth,
							withDay: invoiceConfiguration.withDay,
							withCompanyName: invoiceConfiguration.withCompanyName,
							lastInvoiceNumber: invoiceConfiguration.lastInvoiceNumber,
						});
					}

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
		},
	});
