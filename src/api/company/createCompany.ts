import { db } from '@/db/client';
import { companyTable } from '@/db/tables';
import { createCompanyFormSchema } from '@/routes/_auth/create-company/-lib/components/create-company-form/createCompanyFormSchema';
import {
	handleMutationFn,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { mutationOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { companyQueryKeys, insertCompany } from './companyApiUtils';

const createCompanyParams = z.object({
	...createCompanyFormSchema.shape,
	...insertCompany.pick({
		userId: true,
	}).shape,
});

type CreateCompanyParams = z.infer<typeof createCompanyParams>;

const createCompanyServerFn = createServerFn({
	method: 'POST',
})
	.inputValidator(createCompanyParams)
	.handler(async ({ data }) => {
		try {
			const company = await db
				.insert(companyTable)
				.values({
					email: data.email,
					name: data.name,
					userId: data.userId,
				})
				.returning();

			return createSuccessResponse({
				data: company,
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const createCompanyMutationOptions = () =>
	mutationOptions({
		mutationFn: (data: CreateCompanyParams) =>
			handleMutationFn(() => createCompanyServerFn({ data })),
		onSuccess: (...args) => {
			invalidateOnSuccess({
				args,
				keys: [companyQueryKeys.base()],
			});
		},
	});
