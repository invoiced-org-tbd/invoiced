import { db } from '@/db/client';
import { contractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import { invoiceConfigurationPersistSchema } from '@/components/invoice-configuration-form/invoiceConfigurationFormSchemas';
import { getServerT } from '@/utils/languageUtils';
import { createMutationOptions } from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
	ServerError,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { invalidateContractMutationCaches } from './contractApiUtils';
import { setupInvoiceConfiguration } from './utils/setupInvoiceConfiguration';
import { updateContract } from './utils/updateContract';

const updateContractParams = z.object({
	editId: z.string(),
	form: contractsUpsertFormSchema,
	invoiceConfiguration: invoiceConfigurationPersistSchema.optional(),
});

type UpdateContractParams = z.infer<typeof updateContractParams>;

const updateContractServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(updateContractParams)
	.handler(
		async ({
			data: { editId, form, invoiceConfiguration },
			context: { user, language },
		}) => {
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

					await setupInvoiceConfiguration({
						tx,
						t,
						userId: user.id,
						invoiceConfiguration,
					});

					await updateContract({
						tx,
						userId: user.id,
						contractId: contract.id,
						form,
						t,
					});
				});

				return createSuccessResponse();
			} catch (error) {
				throw createErrorResponse({
					error,
				});
			}
		},
	);

export const updateContractMutationOptions = () =>
	createMutationOptions({
		mutationFn: (params: UpdateContractParams) =>
			updateContractServerFn({ data: params }),
		onSuccess: (...args) => {
			invalidateContractMutationCaches(args);
		},
	});
