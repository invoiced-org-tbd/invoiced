import type { GetEditSmptConfigParams } from './getEditSmptConfig';

const baseKey = 'smtp-configs';

export const smtpQueryKeys = {
	base: () => [baseKey],
	get: () => [baseKey, 'get'],
	getEditSmptConfig: (params: GetEditSmptConfigParams) => [
		baseKey,
		'getEditSmptConfig',
		params.id,
	],
};
