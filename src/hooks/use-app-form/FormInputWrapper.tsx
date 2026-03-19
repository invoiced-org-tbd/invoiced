import type { BaseFieldInputProps } from '@/components/base-field';
import { useFormRootContext } from '@/components/form';
import type { FC } from 'react';
import { useFieldContext } from './contexts';
import type {
	FormInputPropsByMode,
	FormInputWrapperMode,
} from './schemaInference';
import {
	getLeafFieldName,
	modeResolvers,
	resolveFieldSchema,
} from './schemaInference';
import { formatFormInputWrapperErrors } from './utils';

type FormInputWrapperParams<TMode extends FormInputWrapperMode> = {
	Input: FC<FormInputPropsByMode[TMode]>;
	mode: TMode;
};

type GetSchemaInputPropsParams<TMode extends FormInputWrapperMode> = {
	mode: TMode;
};

const useGetSchemaInputProps = <TMode extends FormInputWrapperMode>({
	mode,
}: GetSchemaInputPropsParams<TMode>) => {
	const field = useFieldContext();
	const formContext = useFormRootContext();
	const schema = formContext?.schema;
	const fieldPath = String(field.name);
	const fieldName = getLeafFieldName(fieldPath);

	const baseProps = {
		name: fieldName,
		value: field.state.value as never,
		onChange: field.handleChange,
		onBlur: field.handleBlur,
	} satisfies BaseFieldInputProps<unknown>;

	if (!schema) {
		return baseProps;
	}
	const fieldSchema = resolveFieldSchema(schema, fieldPath, fieldName);
	if (!fieldSchema) {
		return baseProps;
	}
	return modeResolvers[mode]({
		baseProps,
		fieldSchema,
	});
};

export const FormInputWrapper = <TMode extends FormInputWrapperMode>({
	Input,
	mode,
}: FormInputWrapperParams<TMode>) => {
	'use no memo';

	const WrappedInput = (explicitProps: FormInputPropsByMode[TMode]) => {
		'use no memo';
		const field = useFieldContext();

		const schemaProps = useGetSchemaInputProps({
			mode,
		});

		const errors = formatFormInputWrapperErrors(field.state.meta.errors);
		const showErrors = field.state.meta.isTouched && !field.state.meta.isValid;
		const formStateProps = {
			errors,
			showErrors,
		} satisfies Pick<BaseFieldInputProps<unknown>, 'errors' | 'showErrors'>;

		const mergedInputProps = {
			...schemaProps,
			...formStateProps,
			...explicitProps,
		} satisfies FormInputPropsByMode[TMode] as FormInputPropsByMode[TMode];

		return <Input {...mergedInputProps} />;
	};

	return WrappedInput;
};
