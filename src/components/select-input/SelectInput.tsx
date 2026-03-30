import { useId } from 'react';
import { BaseField } from '../base-field/BaseField';
import { useBaseField } from '../base-field/useBaseField';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { InputItem } from '../base-field/types';
import type { SelectInputProps } from './types';
import { Select } from '../select/Select';

export const SelectInput = <TItem extends InputItem>({
	onChange,
	label,
	tooltip,
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

		onChange?.((item as TItem)?.value ?? undefined);
	};

	const value = props.value
		? items.find((item) => item.value === props.value)
		: undefined;

	return (
		<BaseField.Root>
			<BaseField.Label
				htmlFor={id}
				required={inputProps.required}
				tooltip={tooltip}
			>
				{label}
			</BaseField.Label>

			<BaseField.Control>
				<Select.Root
					items={items}
					itemToStringValue={(item) => (item as TItem)?.label ?? ''}
					onValueChange={handleChange}
					data-slot='input'
					{...props}
					value={value}
					disabled={false}
					readOnly={false}
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
