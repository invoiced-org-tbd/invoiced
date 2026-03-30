import { db } from '@/db/client';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import type { ExtractServerFnData } from '@/utils/serverFnsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { sessionMiddleware } from '../sessionMiddleware';
import { emailTemplateQueryKeys } from './emailTemplateApiUtils';

const getEmailTemplatesServerFn = createServerFn({
	method: 'GET',
})
	.middleware([sessionMiddleware])
	.handler(async ({ context: { user } }) => {
		try {
			const emailTemplates = await db.query.emailTemplateTable.findMany({
				where: {
					userId: user.id,
				},
				orderBy: (table, { desc }) => [desc(table.updatedAt)],
			});

			return createSuccessResponse({
				data: emailTemplates,
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export type GetEmailTemplatesResponse = ExtractServerFnData<
	typeof getEmailTemplatesServerFn
>;

export const getEmailTemplatesQueryOptions = () =>
	createQueryOptions({
		queryKey: emailTemplateQueryKeys.list(),
		queryFn: () => getEmailTemplatesServerFn(),
	});
