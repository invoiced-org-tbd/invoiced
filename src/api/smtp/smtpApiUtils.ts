const baseKey = 'smtp-configs';

export const smtpQueryKeys = {
	base: () => [baseKey],
	list: () => [baseKey, 'list'],
};
