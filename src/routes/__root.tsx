import { Toaster } from '@/components/toaster';
import { Tooltip } from '@/components/tooltip';
import { useSyncZodErrorMap } from '@/hooks/use-language/useSyncZodErrorMap';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { tanstackQueryDevtoolsConfig } from '../components/tanstack-query';
import { getRootRouteHead, getRootRouteScripts } from './-lib/utils';

type AppRouterContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<AppRouterContext>()({
	head: () => getRootRouteHead(),
	scripts: () => getRootRouteScripts(),
	notFoundComponent: RootNotFoundComponent,
	errorComponent: RootErrorComponent,
	shellComponent: RootDocument,
});

function RootNotFoundComponent() {
	const { t } = useTranslate();
	return <div>{t('root.notFound')}</div>;
}

function RootErrorComponent() {
	const { t } = useTranslate();
	return <div>{t('root.error')}</div>;
}

function RootDocument({ children }: { children: React.ReactNode }) {
	useSyncZodErrorMap();

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
						triggerHidden: true,
						openHotkey: ['shift+a'],
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
						tanstackQueryDevtoolsConfig,
					]}
				/>
				<SpeedInsights />
				<Analytics />
				<Scripts />
			</body>
		</html>
	);
}
