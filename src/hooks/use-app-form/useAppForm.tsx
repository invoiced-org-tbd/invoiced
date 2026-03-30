import { Checkbox } from '@/components/checkbox/Checkbox';
import { Form } from '@/components/form/Form';
import { MultiSelectInput } from '@/components/multi-select-input/MultiSelectInput';
import { NumberInput } from '@/components/number-input/NumberInput';
import { SelectInput } from '@/components/select-input/SelectInput';
import { Switch } from '@/components/switch/Switch';
import { TextareaInput } from '@/components/textarea-input/TextareaInput';
import { TextInput } from '@/components/text-input/TextInput';
import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './contexts';
import { FormInputWrapper } from './FormInputWrapper';

export { useFormContext } from './contexts';

export const { useAppForm, withFieldGroup } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextInput: FormInputWrapper({ Input: TextInput, mode: 'text' }),
		TextareaInput: FormInputWrapper({ Input: TextareaInput, mode: 'textarea' }),
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
