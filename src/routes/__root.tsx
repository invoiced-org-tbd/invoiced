import { Toaster } from '@/components/toaster';
import { Tooltip } from '@/components/tooltip';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { tanstackQueryDevtoolsConfig } from '../components/tanstack-query';
import { getRootRouteHead, getRootRouteScripts } from './-lib/utils';

export type AppRouterContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<AppRouterContext>()({
	head: () => getRootRouteHead(),
	scripts: () => getRootRouteScripts(),
	notFoundComponent: () => <div>Not Found</div>,
	errorComponent: () => <div>Error</div>,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			suppressHydrationWarning={true}
		>
			<head>
				<HeadContent />
			</head>
			<body suppressHydrationWarning={true}>
				<Tooltip.Provider>
					{children}
					<Toaster />
				</Tooltip.Provider>

				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
						tanstackQueryDevtoolsConfig,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
