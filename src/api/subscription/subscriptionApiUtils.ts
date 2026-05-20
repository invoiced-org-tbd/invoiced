const baseKey = 'subscription';

export const subscriptionQueryKeys = {
	base: () => [baseKey],
	get: () => [baseKey, 'get'],
};
