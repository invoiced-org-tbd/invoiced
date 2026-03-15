import type { ComponentProps, ComponentType, ReactNode } from 'react';
import type { MouseEvent } from 'react';
import type { LucideProps } from 'lucide-react';
import type { ButtonProps } from '../button';
import type { Label } from '@/components/label';
import type z from 'zod';
import type { inputItemSchema } from './schemas';

export type BaseFieldRootProps = ComponentProps<'div'>;

export type BaseFieldControlProps = ComponentProps<'div'> & {
	isLoading?: boolean;
	loadingVariant?: 'box' | 'custom';
	renderLoading?: ReactNode;
};

export type BaseFieldLabelProps = ComponentProps<typeof Label>;

export type BaseFieldDescriptionProps = ComponentProps<'p'>;

export type BaseFieldErrorProps = Omit<ComponentProps<'div'>, 'children'> &
	Pick<BaseFieldInputProps<unknown>, 'errors' | 'showErrors'>;

export type BaseFieldInputButtonsProps = {
	buttons?: InputButton[];
	side: InputButtonSide;
	disabled?: boolean;
	readOnly?: boolean;
	layout?: 'overlay' | 'inline';
	onButtonClick?: (
		event: MouseEvent<HTMLButtonElement>,
		button: InputButton,
	) => void;
} & ComponentProps<'div'>;

export type BaseFieldInputProps<TValue> = {
	id?: string;
	name?: string;
	label?: string;
	description?: string;

	value?: TValue;
	onChange?: (value: TValue | undefined) => void;
	onBlur?: () => void;

	disabled?: boolean;
	required?: boolean;
	readOnly?: boolean;

	errors?: string[];
	showErrors?: boolean;
	buttons?: InputButton[];
};
export type BaseInputProps<TValue, TProps> = Omit<
	TProps,
	keyof BaseFieldInputProps<TValue> | 'form'
> &
	BaseFieldInputProps<TValue>;

export type InputItem = z.infer<typeof inputItemSchema>;
export type WithItems<TItem extends InputItem> = {
	items: TItem[];
};

export type WithItemList<TItem extends InputItem> = WithItems<TItem> & {
	itemRender?: (item: TItem) => React.ReactNode;
	emptyMessage?: string;
	placeholder?: string;
};

export type InputButtonSide = 'left' | 'right';

export type InputButton = {
	side: InputButtonSide;
	icon: ComponentType<LucideProps>;
	onClick: () => void;
	label?: string;
	canFocus?: boolean;
} & Pick<ButtonProps, 'variant' | 'disabled' | 'isOutlined'>;

export type UseBaseFieldParams = Pick<
	BaseFieldInputProps<unknown>,
	'errors' | 'showErrors' | 'disabled' | 'required' | 'readOnly'
>;
