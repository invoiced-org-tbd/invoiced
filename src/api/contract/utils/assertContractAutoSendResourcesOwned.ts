import type { Tx } from '@/db/types';
import type { TranslationFn } from '@/translations/types';
import { ServerError } from '@/utils/serverFnsUtils';

type AssertContractAutoSendResourcesOwnedParams = {
	tx: Tx;
	userId: string;
	emailTemplateId: string;
	t: TranslationFn;
};

export const assertContractAutoSendResourcesOwned = async ({
	tx,
	userId,
	emailTemplateId,
	t,
}: AssertContractAutoSendResourcesOwnedParams) => {
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
