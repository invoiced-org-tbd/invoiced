import { Checkbox } from '@/components/checkbox';
import { MultiSelectInput } from '@/components/multi-select-input';
import { SelectInput } from '@/components/select-input';
import { Switch } from '@/components/switch';
import { TextInput } from '@/components/text-input';
import { NumberInput } from '@/components/number-input';
import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './contexts';
import { FormInputWrapper } from './FormInputWrapper';
import { Form } from '@/components/form';

export { useFieldContext, useFormContext } from './contexts';

export const { useAppForm, withFieldGroup, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextInput: FormInputWrapper(TextInput),
		NumberInput: FormInputWrapper(NumberInput),
		SelectInput: FormInputWrapper(SelectInput),
		MultiSelectInput: FormInputWrapper(MultiSelectInput),
		Checkbox: FormInputWrapper(Checkbox),
		Switch: FormInputWrapper(Switch),
	},
	formComponents: {
		Root: Form.Root,
		Set: Form.Set,
		Group: Form.Group,
		Separator: Form.Separator,
		SubmitButton: Form.SubmitButton,
		CancelButton: Form.CancelButton,
	},
});
