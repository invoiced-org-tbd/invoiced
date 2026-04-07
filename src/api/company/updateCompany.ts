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
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { companyQueryKeys } from './companyApiUtils';
import { sessionMiddleware } from '../sessionMiddleware';
import { companyUpsertFormSchema } from '@/routes/_auth/app/settings/-lib/settings-company-tab/companyUpsertFormSchemas';
import { getServerT } from '@/utils/languageUtils';

const updateCompanyParams = z.object({
	form: companyUpsertFormSchema,
});
type UpdateCompanyParams = z.infer<typeof updateCompanyParams>;

const updateCompanyServerFn = createServerFn({
	method: 'POST',
})
	.middleware([sessionMiddleware])
	.inputValidator(updateCompanyParams)
	.handler(async ({ data: { form }, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			const currentCompany = await db.query.companyTable.findFirst({
				where: {
					userId: user.id,
				},
				columns: {
					id: true,
				},
			});

			if (!currentCompany) {
				return createSuccessResponse({
					data: null,
					message: t('entity.notFound', {
						entity: t('settings.tabs.company.entityName'),
					}),
				});
			}

			const { general, address } = form;

			await db.transaction(async (tx) => {
				await tx
					.update(companyTable)
					.set({
						name: general.name,
						email: general.email,
					})
					.where(eq(companyTable.id, currentCompany.id));

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
