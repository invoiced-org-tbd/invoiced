import type { GetCompanyResponse } from '@/api/company/getCompany';

export const assertNever = (value: never): never => value;

export function assertCompany(
	company: GetCompanyResponse | null,
): asserts company is NonNullable<GetCompanyResponse> {
	if (!company) {
		throw new Error('Company not found');
	}
}

// biome-ignore lint/suspicious/noExplicitAny: function signature is unknown
export type AnyFunction = (...args: any[]) => any;
