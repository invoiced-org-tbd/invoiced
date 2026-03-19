import { Checkbox } from '@/components/checkbox';
import { Form } from '@/components/form';
import { MultiSelectInput } from '@/components/multi-select-input';
import { NumberInput } from '@/components/number-input';
import { SelectInput } from '@/components/select-input';
import { Switch } from '@/components/switch';
import { TextInput } from '@/components/text-input';
import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './contexts';
import { FormInputWrapper } from './FormInputWrapper';

export { useFieldContext, useFormContext } from './contexts';

export const { useAppForm, withFieldGroup, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextInput: FormInputWrapper({ Input: TextInput, mode: 'text' }),
		NumberInput: FormInputWrapper({ Input: NumberInput, mode: 'number' }),
		SelectInput: FormInputWrapper({ Input: SelectInput, mode: 'select' }),
		MultiSelectInput: FormInputWrapper({
			Input: MultiSelectInput,
			mode: 'multi-select',
		}),
		Checkbox: FormInputWrapper({
			Input: Checkbox,
			mode: 'checkbox',
		}),
		Switch: FormInputWrapper({
			Input: Switch,
			mode: 'switch',
		}),
	},
	formComponents: {
		Root: Form.Root,
		Set: Form.Set,
		Group: Form.Group,
		SubSet: Form.SubSet,
		Separator: Form.Separator,
		SubmitButton: Form.SubmitButton,
		CancelButton: Form.CancelButton,
	},
});
