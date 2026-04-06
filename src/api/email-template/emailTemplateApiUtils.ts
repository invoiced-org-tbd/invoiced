import type { GetEditEmailTemplateParams } from './getEditEmailTemplate';

const baseKey = 'email-templates';

export const emailTemplateQueryKeys = {
	base: () => [baseKey],
	list: () => [baseKey, 'list'],
	getEditEmailTemplate: (params: GetEditEmailTemplateParams) => [
		baseKey,
		'getEditEmailTemplate',
		params.id,
	],
};
