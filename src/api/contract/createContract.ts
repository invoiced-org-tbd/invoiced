import { db } from '@/db/client';
import { contractsUpsertFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/contractsUpsertFormSchemas';
import { invoiceConfigurationPersistSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/invoiceConfigurationFormSchemas';
import { getServerT } from '@/utils/languageUtils';
import { createMutationOptions } from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { invalidateContractMutationCaches } from './contractApiUtils';
import { createContract } from './utils/createContract';
import { setupInvoiceConfiguration } from './utils/setupInvoiceConfiguration';

const createContractParams = z.object({
	form: contractsUpsertFormSchema,
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
			data: { form, invoiceConfiguration },
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

					await createContract({
						tx,
						userId: user.id,
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

export const createContractMutationOptions = () =>
	createMutationOptions({
		mutationFn: (params: CreateContractParams) =>
			createContractServerFn({ data: params }),
		onSuccess: (...args) => {
			invalidateContractMutationCaches(args);
		},
	});
