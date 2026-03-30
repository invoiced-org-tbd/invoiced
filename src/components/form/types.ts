import type { ComponentProps, ComponentType, ReactNode } from 'react';
import type { ZodObject } from 'zod';
import type { ButtonProps } from '../button/types';

export type AppFormApi = {
	handleSubmit: () => void;
	AppForm: ComponentType<{
		children?: ReactNode;
	}>;
};

export type FormRootProps<TFormSchema extends ZodObject> = {
	className?: string;
	children?: ReactNode;
	isLoading?: boolean;
	form: AppFormApi;
	schema: TFormSchema;
	safeSearchParamKeys?: string[];
};

export type FormSetProps = ComponentProps<'fieldset'>;

export type FormSubSetProps = ComponentProps<'section'>;

export type FormGroupProps = ComponentProps<'div'>;

export type FormSeparatorProps = ComponentProps<'div'> & {
	children?: ReactNode;
};

export type FormSubmitButtonProps = ButtonProps;

export type FormCancelButtonProps = ButtonProps;
