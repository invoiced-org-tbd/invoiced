import { db } from '@/db/client';
import { companyAddressTable } from '@/db/tables/companyAddressTable';
import { companyTable } from '@/db/tables/companyTable';
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
import { companyQueryKeys } from './companyApiUtils';
import { sessionMiddleware } from '../sessionMiddleware';
import { companyUpsertFormSchema } from '@/routes/_auth/app/settings/-lib/settings-company-tab/companyUpsertFormSchemas';

const createCompanyParams = z.object({
	form: companyUpsertFormSchema,
});

type CreateCompanyParams = z.infer<typeof createCompanyParams>;

const createCompanyServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(createCompanyParams)
	.handler(async ({ data: { form }, context: { user } }) => {
		try {
			const { general, address } = form;

			await db.transaction(async (tx) => {
				const [createdCompany] = await tx
					.insert(companyTable)
					.values({
						email: general.email,
						name: general.name,
						userId: user.id,
					})
					.returning({
						id: companyTable.id,
					});

				await tx.insert(companyAddressTable).values({
					companyId: createdCompany.id,
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

export const createCompanyMutationOptions = () =>
	createMutationOptions({
		mutationFn: (data: CreateCompanyParams) => createCompanyServerFn({ data }),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [companyQueryKeys.base()],
			});
		},
	});
