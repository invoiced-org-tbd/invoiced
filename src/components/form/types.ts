import type { ComponentProps, ComponentType, ReactNode } from 'react';
import type { ButtonProps } from '../button';

export type AppFormApi = {
	handleSubmit: () => void;
	AppForm: ComponentType<{
		children?: ReactNode;
	}>;
};

export type FormRootProps = {
	className?: string;
	children?: ReactNode;
	isLoading?: boolean;
	form: AppFormApi;
};

export type FormSetProps = ComponentProps<'fieldset'>;

export type FormGroupProps = ComponentProps<'div'>;

export type FormSeparatorProps = ComponentProps<'div'> & {
	children?: ReactNode;
};

export type FormSubmitButtonProps = ButtonProps;

export type FormCancelButtonProps = ButtonProps;
