import type { MutationOptions, QueryKey } from '@tanstack/react-query';
import type { SuccessResponse } from './serverFnsUtils';
import { toast } from 'sonner';

export type WithUserId = {
	userId: string;
};

export type WithId = {
	id: string;
};

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
	let message = 'An unknown error occurred';

	if (error instanceof Error) {
		message = error.message;
	} else if (typeof error === 'string') {
		message = error;
	} else if (
		typeof error === 'object' &&
		error !== null &&
		'message' in error
	) {
		message = String(error.message);
	}

	toast.error(message);
};

export const handleQueryFn = async <TData>(
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

export const handleMutationFn = async <TData>(
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
