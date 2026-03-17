import { createCompanyMutationOptions } from '@/api/company/createCompany';
import { useAppForm } from '@/hooks/use-app-form';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { CreateCompanyAddressForm } from './CreateCompanyAddressFields';
import { CreateCompanyGeneralForm } from './CreateCompanyGeneralFields';
import {
	createCompanyFormSchema,
	useCreateCompanyDefaultValues,
} from './createCompanyFormSchema';

const appRouteApi = getRouteApi('/_auth/app');

export const CreateCompanyForm = () => {
	const { t } = useTranslate();
	const navigate = appRouteApi.useNavigate();

	const { mutateAsync: createCompany } = useMutation(
		createCompanyMutationOptions(),
	);

	const defaultValues = useCreateCompanyDefaultValues();
	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: createCompanyFormSchema,
		},
		onSubmit: async ({ value }) => {
			await createCompany(value);

			navigate({
				to: '/app',
			});
		},
	});

	return (
		<form.Root form={form}>
			<form.Group>
				<CreateCompanyGeneralForm
					form={form}
					fields='general'
				/>
				<CreateCompanyAddressForm
					form={form}
					fields='address'
				/>

				<form.SubmitButton className='w-full'>
					{t('createCompany.form.submit')}
				</form.SubmitButton>
			</form.Group>
		</form.Root>
	);
};
