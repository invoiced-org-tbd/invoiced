import type { BaseFieldInputProps } from '@/components/base-field';
import type { FC } from 'react';
import { useFieldContext } from './contexts';
import { formatFormInputWrapperErrors } from './utils';

export const FormInputWrapper = <TProps,>(Input: FC<TProps>) => {
	'use no memo';

	const WrappedInput = (props: TProps) => {
		'use no memo';
		const field = useFieldContext();

		const errors = formatFormInputWrapperErrors(field.state.meta.errors);
		const showErrors = field.state.meta.isTouched && !field.state.meta.isValid;

		const fieldProps = {
			name: field.name,
			value: field.state.value,
			onChange: field.handleChange,
			onBlur: field.handleBlur,
			errors,
			showErrors,
		} satisfies BaseFieldInputProps<unknown>;

		return (
			<Input
				{...fieldProps}
				{...props}
			/>
		);
	};

	return WrappedInput;
};
