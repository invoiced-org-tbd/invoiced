import { invoiceCreationFormSchema } from '@/components/invoice-creation-drawer/invoiceCreationFormSchemas';
import { getRecurrenceItemDate } from '@/components/invoice-creation-drawer/utils';
import { db } from '@/db/client';
import { contractClientAddressSnapshotTable } from '@/db/tables/contractClientAddressSnapshotTable';
import { contractClientSnapshotTable } from '@/db/tables/contractClientSnapshotTable';
import { contractSnapshotTable } from '@/db/tables/contractSnapshotTable';
import { invoiceConfigurationSnapshotTable } from '@/db/tables/invoiceConfigurationSnapshotTable';
import { invoiceConfigurationTable } from '@/db/tables/invoiceConfigurationTable';
import { invoiceItemsTable } from '@/db/tables/invoiceItemsTable';
import { invoiceTable } from '@/db/tables/invoiceTable';
import { getT } from '@/utils/languageUtils';
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
import z from 'zod';
import { getInvoiceFileName } from '../invoice-configuration/utils/getInvoiceFileName';
import { sessionMiddleware } from '../sessionMiddleware';
import { invoiceQueryKeys } from './invoiceApiUtils';

const createInvoiceParams = z.object({
	form: invoiceCreationFormSchema,
	contractId: z.string().min(1),
});

type CreateInvoiceParams = z.infer<typeof createInvoiceParams>;

const snapshotIgnoredColumns = {
	createdAt: false,
	updatedAt: false,
} as const;

const createInvoiceServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(createInvoiceParams)
	.handler(async ({ data, context: { user } }) => {
		try {
			const t = getT();

			const { form, contractId } = data;

			const invoice = await db.transaction(async (tx) => {
				const contract = await tx.query.contractTable.findFirst({
					where: {
						id: contractId,
						userId: user.id,
					},
					columns: snapshotIgnoredColumns,
					with: {
						role: true,
						client: {
							columns: snapshotIgnoredColumns,
							with: {
								address: {
									columns: snapshotIgnoredColumns,
								},
							},
						},
						invoiceRecurrence: {
							with: {
								items: true,
							},
						},
					},
				});

				if (!contract) {
					throw new ServerError({
						message: t('entity.notFound', {
							entity: t('contracts.name'),
						}),
					});
				}

				const existingInvoiceConfiguration =
					await tx.query.invoiceConfigurationTable.findFirst({
						where: {
							userId: user.id,
						},
						columns: {
							lastInvoiceNumber: true,
						},
					});

				if (!existingInvoiceConfiguration) {
					throw new ServerError({
						message: t('invoices.server.invoiceConfigurationRequired'),
					});
				}

				const [
					{ createdAt: _icca, updatedAt: _icua, ...invoiceConfiguration },
				] = await tx
					.update(invoiceConfigurationTable)
					.set({
						lastInvoiceNumber:
							existingInvoiceConfiguration.lastInvoiceNumber + 1,
					})
					.returning();

				if (!invoiceConfiguration) {
					throw new ServerError({
						message: t('invoices.server.invoiceConfigurationRequired'),
					});
				}

				const items = [...form.items];

				let issueDate = form.issueDate;
				if (form.mode === 'from-recurrence') {
					const dbRecurrence = contract.invoiceRecurrence.items.find(
						(item) => item.id === form.recurrenceId,
					);
					if (!dbRecurrence) {
						throw new ServerError({
							message: t('invoices.server.recurrenceItemNotFound'),
						});
					}
					const value = contract.role.rate * (dbRecurrence.percentage / 100);

					items.push({
						description: contract.role.description,
						amount: value,
					});

					const { recurrenceDate } = getRecurrenceItemDate({
						recurrenceItem: dbRecurrence,
					});
					issueDate = recurrenceDate;
				}

				const { invoiceFileName } = getInvoiceFileName({
					invoiceConfiguration,
					companyName: contract.client.companyName,
					date: issueDate,
				});

				const [invoice] = await tx
					.insert(invoiceTable)
					.values({
						issueDate,
						fileName: invoiceFileName,
						userId: user.id,
					})
					.returning({ id: invoiceTable.id });

				const {
					id: originalInvoiceConfigurationId,
					...invoiceConfigurationSnapshotData
				} = invoiceConfiguration;

				await tx.insert(invoiceConfigurationSnapshotTable).values({
					...invoiceConfigurationSnapshotData,
					invoiceId: invoice.id,
					originalInvoiceConfigurationId,
				});

				await tx.insert(invoiceItemsTable).values(
					items.map((item) => ({
						description: item.description,
						amount: item.amount,
						invoiceId: invoice.id,
					})),
				);

				const {
					id: originalContractId,
					role: _,
					invoiceRecurrence: __,
					client: contractClient,
					...contractSnapshotData
				} = contract;
				const [contractSnapshot] = await tx
					.insert(contractSnapshotTable)
					.values({
						...contractSnapshotData,
						originalContractId,
						invoiceId: invoice.id,
					})
					.returning({ id: contractSnapshotTable.id });

				const {
					id: originalContractClientId,
					address: contractClientAddress,
					...contractClientSnapshotData
				} = contractClient;

				const [contractClientSnapshot] = await tx
					.insert(contractClientSnapshotTable)
					.values({
						...contractClientSnapshotData,
						contractSnapshotId: contractSnapshot.id,
						originalContractClientId,
					})
					.returning({ id: contractClientSnapshotTable.id });

				const {
					id: originalContractClientAddressId,
					...contractClientAddressSnapshotData
				} = contractClientAddress;

				await tx.insert(contractClientAddressSnapshotTable).values({
					...contractClientAddressSnapshotData,
					contractClientSnapshotId: contractClientSnapshot.id,
					originalContractClientAddressId,
				});

				return invoice;
			});

			return createSuccessResponse({
				data: invoice,
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const createInvoiceMutationOptions = () =>
	createMutationOptions({
		mutationFn: (params: CreateInvoiceParams) =>
			createInvoiceServerFn({ data: params }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [invoiceQueryKeys.base()],
			});
		},
	});
