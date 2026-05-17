import type { ComponentProps, ReactNode } from 'react';
import type { BaseInputProps } from '../base-field/types';

export type TextInputProps = BaseInputProps<string, ComponentProps<'input'>> & {
	labelRightSlot?: ReactNode;
};
