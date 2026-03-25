import { QueryClient } from '@tanstack/react-query';
import type { TanstackQueryContext } from './types';

export const getQueryContext = (): TanstackQueryContext => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 3, // 3 minutes
			},
		},
	});
	return {
		queryClient,
	};
};

