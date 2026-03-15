import type { ComponentProps } from 'react';
import type { UseBaseFieldParams } from './types';

export const useBaseField = ({
	errors,
	showErrors,
	disabled,
	required,
	readOnly,
}: UseBaseFieldParams) => {
	const isInvalid = !!errors?.length && !!showErrors;

	const inputProps = {
		'aria-invalid': isInvalid,
		'aria-disabled': disabled,
		'aria-required': required,
		'aria-readonly': readOnly,
		disabled,
		required,
		readOnly,
	} satisfies ComponentProps<'input'>;

	return {
		inputProps,
	};
};
