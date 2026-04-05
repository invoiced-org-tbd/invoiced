import { createContext, useContext } from 'react';
import type { ZodObject } from 'zod';

export type FormRootContextValue<TFormSchema extends ZodObject = ZodObject> = {
	isLoading: boolean;
	schema: TFormSchema;
	safeSearchParamKeys: string[];
};

type NavigationLocationLike = {
	pathname: string;
	params: Record<string, unknown>;
	search: Record<string, unknown>;
};

type HasDifferentValuesExceptParams = {
	currentRecord: Record<string, unknown>;
	nextRecord: Record<string, unknown>;
	safeSearchParamKeys?: string[];
};
/** true when any key value changed; missing keys count as undefined. keys in `safeSearchParamKeys` are skipped. */
const hasDifferentValuesExcept = ({
	currentRecord,
	nextRecord,
	safeSearchParamKeys = [],
}: HasDifferentValuesExceptParams) => {
	const keys = new Set([
		...Object.keys(currentRecord),
		...Object.keys(nextRecord),
	]);
	for (const key of keys) {
		if (safeSearchParamKeys.includes(key)) {
			continue;
		}

		const currentValue = key in currentRecord ? currentRecord[key] : undefined;
		const nextValue = key in nextRecord ? nextRecord[key] : undefined;

		if (currentValue !== nextValue) {
			return true;
		}
	}

	return false;
};

type IsDangerousNavigationParams = {
	current: NavigationLocationLike;
	next: NavigationLocationLike;
	safeSearchParamKeys: string[];
};
export const isDangerousNavigation = ({
	current,
	next,
	safeSearchParamKeys,
}: IsDangerousNavigationParams) => {
	// different url path, e.g. leaving the route will block if the form is dirty.
	if (current.pathname !== next.pathname) {
		return true;
	}

	// path params, e.g. `/contracts/123`, a change means a different contract.
	if (
		hasDifferentValuesExcept({
			currentRecord: current.params,
			nextRecord: next.params,
		})
	) {
		return true;
	}

	// search params, ignore keys the form declared as safe, e.g. in-drawer `step`.
	if (
		hasDifferentValuesExcept({
			currentRecord: current.search,
			nextRecord: next.search,
			safeSearchParamKeys,
		})
	) {
		return true;
	}

	return false;
};

type PersistedFormLike<TValues> = {
	state: {
		values: TValues;
	};
	reset: (values?: TValues, options?: { keepDefaultValues?: boolean }) => void;
};

type RunAfterSubmitSuccessParams<TValues, TResult> = {
	form: PersistedFormLike<TValues>;
	action: () => TResult;
};

// this prevents navigation blocking when editing an entity - e.g. contract updated, when closing the form is isDirty so triggers the blocker
export const runAfterSubmitSuccess = <TValues, TResult>({
	form,
	action,
}: RunAfterSubmitSuccessParams<TValues, TResult>) => {
	form.reset(form.state.values, {
		keepDefaultValues: false,
	});
	return action();
};

export const FormRootContext = createContext<FormRootContextValue | undefined>(
	undefined,
);

export const useFormRootContext = () => {
	return useContext(FormRootContext);
};
