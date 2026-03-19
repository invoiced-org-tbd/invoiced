import { useId } from 'react';
import { BaseField } from '../base-field';
import { useBaseField } from '../base-field/useBaseField';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { InputItem } from '../base-field/types';
import type { SelectInputProps } from './types';
import { isInputItem } from '../base-field/utils';
import { Select } from '../select';

export const SelectInput = <TItem extends InputItem>({
	onChange,
	label,
	description,
	errors,
	showErrors,
	disabled,
	required,
	readOnly,
	allowEmpty,
	items,
	placeholder,
	emptyMessage,
	itemRender,
	buttons,
	...props
}: SelectInputProps<TItem>) => {
	const { t } = useTranslate();
	const resolvedPlaceholder = placeholder ?? t('select.placeholder');
	const resolvedEmptyMessage = emptyMessage ?? t('select.emptyMessage');
	const baseId = useId();
	const id = props.id ?? baseId;

	const { inputProps } = useBaseField({
		errors,
		showErrors,
		disabled,
		required,
		readOnly,
	});

	const handleChange = (item: unknown) => {
		if (readOnly) {
			return;
		}

		if (!item && !allowEmpty) {
			return;
		}
		if (!isInputItem(item) || !item.value) {
			onChange?.(undefined);
			return;
		}

		onChange?.(item.value);
	};

	return (
		<BaseField.Root>
			<BaseField.Label
				htmlFor={id}
				required={inputProps.required}
			>
				{label}
			</BaseField.Label>

			<BaseField.Control>
				<Select.Root
					items={items}
					onValueChange={handleChange}
					data-slot='input'
					{...props}
					id={id}
				>
					<Select.Input
						placeholder={resolvedPlaceholder}
						buttons={buttons}
						{...inputProps}
					/>
					<Select.Content>
						<Select.Empty>{resolvedEmptyMessage}</Select.Empty>

						<Select.List>
							{(item: TItem) => {
								return (
									<Select.Item
										key={item.value}
										value={item}
									>
										{itemRender?.(item) ?? item.label}
									</Select.Item>
								);
							}}
						</Select.List>
					</Select.Content>
				</Select.Root>
			</BaseField.Control>

			<BaseField.Description>{description}</BaseField.Description>
			<BaseField.Error
				errors={errors}
				showErrors={showErrors}
			/>
		</BaseField.Root>
	);
};
