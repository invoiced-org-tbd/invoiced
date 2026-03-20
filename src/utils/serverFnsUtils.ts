import type {
	DataTableOrderByState,
	DataTablePaginationState,
} from '@/components/data-table';
import { setResponseStatus } from '@tanstack/react-start/server';
import { sql } from 'drizzle-orm';

export const HTTP_STATUS_CODES = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
} as const;
export type HTTPStatusCode =
	(typeof HTTP_STATUS_CODES)[keyof typeof HTTP_STATUS_CODES];

export class ServerError extends Error {
	statusCode!: HTTPStatusCode;

	constructor({
		message,
		statusCode,
	}: {
		message: string;
		statusCode?: HTTPStatusCode;
	}) {
		super(message);
		this.statusCode = statusCode ?? HTTP_STATUS_CODES.BAD_REQUEST;
	}
}

export type SuccessResponse<T> = {
	data: T;
	message?: string;
};

export type ErrorResponse = {
	message: string;
};

export type ExtractServerFnData<
	// biome-ignore lint/suspicious/noExplicitAny: fn signature is unknown
	TServerFn extends (...args: any) => Promise<SuccessResponse<unknown>>,
> = Awaited<ReturnType<TServerFn>>['data'];

type CreateSuccessResponseParams<T> = {
	data?: T;
	message?: string;
	statusCode?: HTTPStatusCode;
};
export const createSuccessResponse = <T = null>(
	params?: CreateSuccessResponseParams<T>,
): SuccessResponse<T> => {
	const data = params?.data ?? (null as T);
	const message = params?.message ?? undefined;
	const statusCode = params?.statusCode ?? HTTP_STATUS_CODES.OK;

	setResponseStatus(statusCode);

	return { data, message };
};

type CreateErrorResponseParams = {
	statusCode?: HTTPStatusCode;
	error?: unknown;
};
export const createErrorResponse = ({
	error,
	statusCode = HTTP_STATUS_CODES.BAD_REQUEST,
}: CreateErrorResponseParams): ErrorResponse => {
	setResponseStatus(statusCode);

	let errorMessage = '';
	if (error instanceof Error) {
		if (error instanceof ServerError) {
			statusCode = error.statusCode;
		}

		errorMessage = error.message;
	} else if (typeof error === 'string') {
		errorMessage = error;
	}

	return { message: errorMessage };
};

export type PaginatedResponseData<TData> = {
	items: TData[];
	total: number;
};
export const createPaginatedData = <TData extends { total: number }>(
	data: TData[],
): PaginatedResponseData<TData> => {
	return {
		items: data,
		total: data[0]?.total ?? 0,
	};
};

export type GetPaginatedQueryOrderByParams = {
	orderBy: DataTableOrderByState;
};
export const getPaginatedQueryOrderBy = ({
	orderBy,
}: GetPaginatedQueryOrderByParams) => {
	if (!orderBy?.id || typeof orderBy.id !== 'string') {
		return undefined;
	}

	// NOTE: this helper expects orderBy.id to be a backend-allowed field mapping
	// nested UI IDs like "address.city" must be translated/allowlisted before reaching DB query builders
	return {
		[orderBy.id]: orderBy.desc ? 'desc' : 'asc',
	};
};

export type GetPaginatedQueryLimitOffsetParams = {
	pagination: DataTablePaginationState;
};
export const getPaginatedQueryLimitOffset = ({
	pagination,
}: GetPaginatedQueryLimitOffsetParams): { limit: number; offset: number } => {
	const limit = pagination?.pageSize ?? 0;
	const offset = (pagination?.pageIndex ?? 0) * limit;

	return { limit, offset };
};

export const getPaginatedQueryExtras = () => {
	return {
		total: sql<number>`COUNT(*) OVER()`,
	};
};
