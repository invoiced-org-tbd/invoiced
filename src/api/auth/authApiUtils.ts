const baseKey = 'auth';
export const authQueryKeys = {
	base: () => [baseKey],
	session: () => [baseKey, 'session'],
};

export const SESSION_STALE_TIME = 30_000; // 30 seconds
