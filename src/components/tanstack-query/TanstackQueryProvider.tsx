import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { TanstackQueryProviderProps, TanstackQueryContext } from './types';

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

export const TanstackQueryProvider = ({
	children,
	queryClient,
}: TanstackQueryProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};
