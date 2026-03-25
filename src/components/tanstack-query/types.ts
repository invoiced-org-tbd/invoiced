import type { QueryClient } from '@tanstack/react-query';
import type { TanStackDevtoolsReactPlugin } from '@tanstack/react-devtools';

export type TanstackQueryContext = {
	queryClient: QueryClient;
};

export type TanstackQueryDevtoolsConfig = TanStackDevtoolsReactPlugin;
