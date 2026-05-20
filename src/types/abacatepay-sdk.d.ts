declare module '@abacatepay/sdk' {
	export const AbacatePay: (options: { secret: string }) => {
		subscriptions: {
			create: (
				body: Record<string, unknown>,
			) => Promise<Record<string, unknown>>;
			list: (query?: Record<string, unknown>) => Promise<unknown>;
		};
		rest: unknown;
	};
	export class AbacatePayError extends Error {}
	export class HTTPError extends Error {}
}
