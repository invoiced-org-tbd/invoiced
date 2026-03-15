import type { NumericFormatProps } from 'react-number-format';
import type { NumberInputProps } from './types';

const integerModeProps: Partial<NumericFormatProps> = {
	//
};

const floatModeProps: Partial<NumericFormatProps> = {
	decimalScale: 2,
	fixedDecimalScale: true,
	allowLeadingZeros: false,
};

const currencyModeProps: Partial<NumericFormatProps> = {
	min: 0,
	prefix: '$',
	suffix: ' USD',
	decimalSeparator: ',',
	decimalScale: 2,
	fixedDecimalScale: true,
	allowNegative: false,
	allowLeadingZeros: false,
};

const modePropsMap: Record<
	NonNullable<NumberInputProps['mode']>,
	Partial<NumericFormatProps>
> = {
	integer: integerModeProps,
	float: floatModeProps,
	currency: currencyModeProps,
};

export const getNumberInputModeProps = (
	props: NumberInputProps,
): Partial<NumericFormatProps> => {
	return modePropsMap[props.mode ?? 'integer'];
};
