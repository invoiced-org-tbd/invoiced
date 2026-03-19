import { createContext, useContext } from 'react';
import type { ZodObject } from 'zod';

export type FormRootContextValue<TFormSchema extends ZodObject = ZodObject> = {
	isLoading: boolean;
	schema: TFormSchema;
};

export const FormRootContext = createContext<FormRootContextValue | undefined>(
	undefined,
);

export const useFormRootContext = () => {
	return useContext(FormRootContext);
};
