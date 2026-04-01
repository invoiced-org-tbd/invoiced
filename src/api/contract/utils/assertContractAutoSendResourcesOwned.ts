import '@tanstack/react-start/server-only';

import type { Tx } from '@/db/types';
import type { TranslationFn } from '@/translations/types';
import { ServerError } from '@/utils/serverFnsUtils';

type AssertContractAutoSendResourcesOwnedParams = {
	tx: Tx;
	userId: string;
	smtpConfigId: string;
	emailTemplateId: string;
	t: TranslationFn;
};

export const assertContractAutoSendResourcesOwned = async ({
	tx,
	userId,
	smtpConfigId,
	emailTemplateId,
	t,
}: AssertContractAutoSendResourcesOwnedParams) => {
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
};
