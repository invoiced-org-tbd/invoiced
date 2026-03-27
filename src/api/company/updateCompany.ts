import { db } from '@/db/client';
import { companyAddressTable } from '@/db/tables/companyAddressTable';
import { companyTable } from '@/db/tables/companyTable';
import { eq } from 'drizzle-orm';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
	HTTP_STATUS_CODES,
	ServerError,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import type z from 'zod';
import { companyQueryKeys } from './companyApiUtils';
import { companyUpsertFormSchema } from './companyUpsertSchema';
import { sessionMiddleware } from '../sessionMiddleware';

const updateCompanyParams = companyUpsertFormSchema.clone();
type UpdateCompanyParams = z.infer<typeof updateCompanyParams>;

const updateCompanyServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(updateCompanyParams)
	.handler(async ({ data, context: { user } }) => {
		try {
			const currentCompany = await db.query.companyTable.findFirst({
				where: {
					userId: user.id,
				},
				with: {
					address: true,
				},
			});

			if (!currentCompany) {
				throw new ServerError({
					message: 'Company not found',
					statusCode: HTTP_STATUS_CODES.NOT_FOUND,
				});
			}

			const { general, address } = data;

			await db.transaction(async (tx) => {
				await tx
					.update(companyTable)
					.set({
						name: general.name,
						email: general.email,
					})
					.where(eq(companyTable.id, currentCompany.id));

				if (currentCompany.address) {
					await tx
						.update(companyAddressTable)
						.set({
							street1: address.street1,
							street2: address.street2 || null,
							number: address.number,
							postalCode: address.postalCode,
							city: address.city,
							state: address.state,
							country: 'br',
						})
						.where(eq(companyAddressTable.companyId, currentCompany.id));
					return;
				}

				await tx.insert(companyAddressTable).values({
					companyId: currentCompany.id,
					street1: address.street1,
					street2: address.street2 || null,
					number: address.number,
					postalCode: address.postalCode,
					city: address.city,
					state: address.state,
					country: 'br',
				});
			});

			return createSuccessResponse();
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const updateCompanyMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: UpdateCompanyParams) => updateCompanyServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [companyQueryKeys.base()],
			});
		},
	});
