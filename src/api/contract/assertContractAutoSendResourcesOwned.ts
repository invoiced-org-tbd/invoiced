import type { db } from '@/db/client';
import { ServerError } from '@/utils/serverFnsUtils';
import type { TranslationFn } from '@/translations/types';

type DbTransaction = Parameters<Parameters<(typeof db)['transaction']>[0]>[0];

export async function assertContractAutoSendResourcesOwned(
	tx: DbTransaction,
	{
		userId,
		smtpConfigId,
		emailTemplateId,
		t,
	}: {
		userId: string;
		smtpConfigId: string;
		emailTemplateId: string;
		t: TranslationFn;
	},
) {
	const smtp = await tx.query.smtpConfigTable.findFirst({
		where: {
			id: smtpConfigId,
			userId,
		},
	});

	if (!smtp) {
		throw new ServerError({
			message: t('contracts.form.autoSend.invalidSmtpConfiguration'),
		});
	}

	const emailTemplate = await tx.query.emailTemplateTable.findFirst({
		where: {
			id: emailTemplateId,
			userId,
		},
	});

	if (!emailTemplate) {
		throw new ServerError({
			message: t('contracts.form.autoSend.invalidEmailTemplate'),
		});
	}
}
