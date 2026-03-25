import { mutationOptions, queryOptions } from '@tanstack/react-query';
import type {
	DefaultError,
	MutationOptions,
	QueryKey,
	SkipToken,
	UndefinedInitialDataOptions,
	UseMutationOptions,
} from '@tanstack/react-query';
import type { SuccessResponse } from './serverFnsUtils';
import { toast } from 'sonner';
import { translate } from '@/translations/translate';
import { getLanguage } from './languageUtils';

type InvalidateOnSuccessParams = {
	args: Parameters<
		NonNullable<MutationOptions<unknown, unknown, unknown>['onSuccess']>
	>;
	keys: QueryKey[];
};
export const invalidateOnSuccess = ({
	args,
	keys,
}: InvalidateOnSuccessParams) => {
	const context = args[3];

	for (const key of keys) {
		context.client.invalidateQueries({ queryKey: key });
	}
};

const handleError = (error: unknown) => {
	let message = '';

	if (error) {
		if (error instanceof Error) {
			message = error.message;
		} else if (typeof error === 'string') {
			message = error;
		}
	}

	if (!message) {
		const language = getLanguage();
		message = translate(language, 'common.unknownError');
	}

	toast.error(message);
};

const handleQueryFn = async <TData>(
	queryFn: () => Promise<SuccessResponse<TData>>,
): Promise<TData> => {
	try {
		const result = await queryFn();

		if (result.message) {
			toast.success(result.message);
		}

		return result.data;
	} catch (error) {
		handleError(error);
		throw error;
	}
};

const handleMutationFn = async <TData>(
	mutationFn: () => Promise<SuccessResponse<TData>>,
): Promise<TData> => {
	try {
		const result = await mutationFn();
		if (result.message) {
			toast.success(result.message);
		}

		return result.data;
	} catch (error) {
		handleError(error);
		throw error;
	}
};

type WrappedQueryOptions<
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
> = Omit<
	UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
	'queryFn'
> & {
	queryFn: Exclude<
		UndefinedInitialDataOptions<
			SuccessResponse<TQueryFnData>,
			TError,
			SuccessResponse<TData>,
			TQueryKey
		>['queryFn'],
		SkipToken | undefined
	>;
};

export const createQueryOptions = <
	TQueryFnData = unknown,
	TError = DefaultError,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	options: WrappedQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) => {
	const wrappedQueryFn = (
		...args: Parameters<typeof options.queryFn>
	): Promise<TQueryFnData> =>
		handleQueryFn(() => Promise.resolve(options.queryFn(...args)));

	return queryOptions({
		...options,
		queryFn: wrappedQueryFn,
	});
};

type WrappedMutationOptions<
	TData = unknown,
	TError = DefaultError,
	TVariables = void,
	TOnMutateResult = unknown,
> = Omit<
	UseMutationOptions<TData, TError, TVariables, TOnMutateResult>,
	'mutationFn'
> & {
	mutationFn: NonNullable<
		UseMutationOptions<
			SuccessResponse<TData>,
			TError,
			TVariables,
			TOnMutateResult
		>['mutationFn']
	>;
};

export const createMutationOptions = <
	TData = unknown,
	TError = DefaultError,
	TVariables = void,
	TOnMutateResult = unknown,
>(
	options: WrappedMutationOptions<TData, TError, TVariables, TOnMutateResult>,
) => {
	const wrappedMutationFn = (
		...args: Parameters<typeof options.mutationFn>
	): Promise<TData> =>
		handleMutationFn(() => Promise.resolve(options.mutationFn(...args)));

	return mutationOptions({
		...options,
		mutationFn: wrappedMutationFn,
	});
};
