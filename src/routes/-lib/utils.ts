import foucPreventionScript from '@/fouc-prevention.js?url';
import appCss from '@/styles.css?url';
import { appConfig } from '@/utils/appConfig';
import type { AnyFunction } from '@/utils/typesUtils';
import type { AnyRoute, UpdatableRouteOptions } from '@tanstack/react-router';

type RouteOptions = UpdatableRouteOptions<
	AnyRoute,
	unknown,
	unknown,
	unknown,
	unknown,
	unknown,
	unknown,
	unknown,
	unknown,
	unknown
>;
type RouteKeyOption<TKey extends keyof RouteOptions> =
	NonNullable<RouteOptions[TKey]> extends AnyFunction
		? ReturnType<NonNullable<RouteOptions[TKey]>>
		: never;

type HeadOptions = RouteKeyOption<'head'>;
export const getRootRouteHead = (): HeadOptions => ({
	meta: [
		{
			charSet: 'utf-8',
		},
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1',
		},
		{
			title: appConfig.seo.title,
		},
		{
			name: 'description',
			content: appConfig.seo.description,
		},
	],
	links: [
		{
			rel: 'stylesheet',
			href: appCss,
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicon-16x16.png',
		},
		{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico',
		},
		{
			rel: 'manifest',
			href: '/site.webmanifest',
		},
	],
});

type ScriptsOptions = RouteKeyOption<'scripts'>;
export const getRootRouteScripts = (): ScriptsOptions => [
	{
		src: foucPreventionScript,
	},
];
