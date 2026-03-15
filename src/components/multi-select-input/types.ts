import type { BaseInputProps, InputItem } from '../base-field/types';

export type MultiSelectInputItem = InputItem & {
	disabled?: boolean;
};

export type MultiSelectInputGroup = {
	heading: string;
	options: MultiSelectInputItem[];
};

export type MultiSelectInputProps = BaseInputProps<
	string[],
	{
		options: MultiSelectInputItem[] | MultiSelectInputGroup[];
		placeholder?: string;
		searchable?: boolean;
		hideSelectAll?: boolean;
		maxCount?: number;
		closeOnSelect?: boolean;
		className?: string;
	}
>;
