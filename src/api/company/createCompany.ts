import { db } from '@/db/client';
import { companyAddressTable, companyTable } from '@/db/tables';
import { createCompanyFormSchema } from '@/routes/_auth/create-company/-lib/components/create-company-form/createCompanyFormSchema';
import {
	createMutationOptions,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
	HTTP_STATUS_CODES,
	ServerError,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import type z from 'zod';
import { companyQueryKeys } from './companyApiUtils';
import { sessionMiddleware } from '../sessionMiddleware';

const createCompanyParams = createCompanyFormSchema.clone();

type CreateCompanyParams = z.infer<typeof createCompanyParams>;

const createCompanyServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(createCompanyParams)
	.handler(async ({ data, context: { user } }) => {
		try {
			const { general, address } = data;

			await db.transaction(async (tx) => {
				const [createdCompany] = await tx
					.insert(companyTable)
					.values({
						email: general.email,
						name: general.name,
						userId: user.id,
					})
					.returning();

				if (!createdCompany) {
					throw new ServerError({
						message: 'Failed to create company',
						statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
					});
				}

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

export type CreateCompanyResponse = ExtractServerFnData<
	typeof createCompanyServerFn
>;

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
