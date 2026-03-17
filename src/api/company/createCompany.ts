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

			const company = await db.transaction(async (tx) => {
				const [createdCompany] = await tx
					.insert(companyTable)
					.values({
						email: data.email,
						name: data.name,
						userId: user.id,
					})
					.returning();

				const companyId = createdCompany.id;
				if (!companyId) {
					throw new Error('Failed to create company');
				}

				await tx.insert(addressTable).values({
					addressableType: 'company',
					addressableId: companyId,
					street1: data.street1,
					street2: data.street2 || null,
					number: data.number,
					postalCode: data.postalCode,
					city: data.city,
					state: data.state,
					country: data.country,
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
