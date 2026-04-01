const baseKey = 'smtp-configs';

export const smtpQueryKeys = {
	base: () => [baseKey],
	get: () => [baseKey, 'get'],
};
