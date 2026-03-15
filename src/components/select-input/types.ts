import type {
	BaseInputProps,
	InputItem,
	WithItemList,
} from '../base-field/types';

export type SelectInputProps<TItem extends InputItem> = BaseInputProps<
	TItem['value'],
	WithItemList<TItem> & {
		allowEmpty?: boolean;
		className?: string;
	}
>;
