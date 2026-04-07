import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { sessionMiddleware } from '../sessionMiddleware';
import { db } from '@/db/client';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { getServerT } from '@/utils/languageUtils';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import { smtpQueryKeys } from './smtpApiUtils';

const getEditSmptConfigParams = z.object({
	id: z.string(),
});

export type GetEditSmptConfigParams = z.infer<typeof getEditSmptConfigParams>;

const getEditSmptConfigServerFn = createServerFn({
	method: 'GET',
})
	.middleware([sessionMiddleware])
	.inputValidator(getEditSmptConfigParams)
	.handler(async ({ data, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			const smtpConfig = await db.query.smtpConfigTable.findFirst({
				where: {
					id: data.id,
					userId: user.id,
				},
				columns: {
					password: false,
				},
			});

			if (!smtpConfig) {
				return createSuccessResponse({
					data: null,
					message: t('entity.notFound', {
						entity: t('settings.tabs.automations.smtp.entityName'),
					}),
				});
			}

			return createSuccessResponse({
				data: smtpConfig,
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const getEditSmptConfigQueryOptions = (
	params: GetEditSmptConfigParams,
) =>
	createQueryOptions({
		queryKey: smtpQueryKeys.getEditSmptConfig(params),
		queryFn: () => getEditSmptConfigServerFn({ data: params }),
	});
