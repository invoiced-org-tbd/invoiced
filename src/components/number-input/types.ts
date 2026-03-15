import type { BaseInputProps } from '../base-field/types';
import type { NumericFormatProps } from 'react-number-format';

type NumberInputFormatProps = Omit<
	NumericFormatProps,
	| 'value'
	| 'defaultValue'
	| 'onValueChange'
	| 'onBlur'
	| 'min'
	| 'max'
	| 'getInputRef'
>;

export type NumberInputProps = BaseInputProps<
	number,
	NumberInputFormatProps & {
		mode?: 'integer' | 'float' | 'currency';
		stepper?: number;
		defaultValue?: number;
		min?: number;
		max?: number;
	}
>;
