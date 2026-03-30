import { db } from '@/db/client';
import { getServerT } from '@/utils/languageUtils';
import { createQueryOptions } from '@/utils/queryOptionsUtils';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { contractQueryKeys } from './contractApiUtils';
import { sessionMiddleware } from '../sessionMiddleware';

const getEditContractParams = z.object({
	id: z.string(),
});

export type GetEditContractParams = z.infer<typeof getEditContractParams>;

const getEditContractServerFn = createServerFn({
	method: 'GET',
})
	.middleware([sessionMiddleware])
	.inputValidator(getEditContractParams)
	.handler(async ({ data, context: { user, language } }) => {
		try {
			const t = getServerT(language);

			const contract = await db.query.contractTable.findFirst({
				where: {
					id: data.id,
					userId: user.id,
				},
				with: {
					role: true,
					client: {
						with: {
							address: true,
						},
					},
					invoiceRecurrence: {
						with: {
							items: true,
						},
					},
					autoSend: true,
				},
			});

			if (!contract) {
				return createSuccessResponse({
					data: null,
					message: t('entity.notFound', {
						entity: t('contracts.name'),
					}),
				});
			}

			const { autoSend: autoSendRow, ...contractRest } = contract;

			return createSuccessResponse({
				data: {
					...contractRest,
					autoSend: autoSendRow
						? {
								enabled: true,
								smtpConfigId: autoSendRow.smtpConfigId,
								emailTemplateId: autoSendRow.emailTemplateId,
							}
						: {
								enabled: false,
								smtpConfigId: '',
								emailTemplateId: '',
							},
				},
			});
		} catch (error) {
			throw createErrorResponse({
				error,
			});
		}
	});

export const getEditContractQueryOptions = (params: GetEditContractParams) =>
	createQueryOptions({
		queryKey: contractQueryKeys.getEditContract(params),
		queryFn: () => getEditContractServerFn({ data: params }),
	});
