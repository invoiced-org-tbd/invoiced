import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import type { TanstackQueryDevtoolsConfig } from './types';

export const tanstackQueryDevtoolsConfig: TanstackQueryDevtoolsConfig = {
	name: 'Tanstack Query',
	render: <ReactQueryDevtoolsPanel />,
};
