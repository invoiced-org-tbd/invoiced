import type { PropsWithChildren } from 'react';
import type { QueryClient } from '@tanstack/react-query';
import type { TanStackDevtoolsReactPlugin } from '@tanstack/react-devtools';

export type TanstackQueryProviderProps = PropsWithChildren<{
	queryClient: QueryClient;
}>;

export type TanstackQueryContext = {
	queryClient: QueryClient;
};

export type TanstackQueryDevtoolsConfig = TanStackDevtoolsReactPlugin;
