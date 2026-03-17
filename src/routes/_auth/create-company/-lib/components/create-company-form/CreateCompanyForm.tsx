import { createCompanyMutationOptions } from '@/api/company/createCompany';
import { useAppForm } from '@/hooks/use-app-form';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { CreateCompanyAddressFields } from './CreateCompanyAddressFields';
import { CreateCompanyGeneralFields } from './CreateCompanyGeneralFields';
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
				<CreateCompanyGeneralFields
					form={form}
					fields='general'
				/>
				<CreateCompanyAddressFields
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
