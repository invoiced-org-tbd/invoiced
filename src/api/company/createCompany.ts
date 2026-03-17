import { db } from '@/db/client';
import { addressTable, companyTable } from '@/db/tables';
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
import { ensureAuthSessionServerFn } from '../auth/ensureAuthSession';
import { companyQueryKeys } from './companyApiUtils';

const createCompanyParams = createCompanyFormSchema.clone();

type CreateCompanyParams = z.infer<typeof createCompanyParams>;

const createCompanyServerFn = createServerFn({
	method: 'POST',
})
	.inputValidator(createCompanyParams)
	.handler(async ({ data }) => {
		try {
			const {
				data: { user },
			} = await ensureAuthSessionServerFn();

			const { general, address } = data;

			const company = await db.transaction(async (tx) => {
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

				await tx.insert(addressTable).values({
					addressableType: 'company',
					addressableId: createdCompany.id,
					street1: address.street1,
					street2: address.street2 || null,
					number: address.number,
					postalCode: address.postalCode,
					city: address.city,
					state: address.state,
					country: address.country,
				});

				return createdCompany;
			});

			return createSuccessResponse({
				data: company,
			});
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
