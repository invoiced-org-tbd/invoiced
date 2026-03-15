import { createContext, useContext } from 'react';

export type FormRootContextValue = {
	isLoading: boolean;
};

export const FormRootContext = createContext<FormRootContextValue | undefined>(
	undefined,
);

export const useFormRootContext = () => {
	return useContext(FormRootContext);
};
