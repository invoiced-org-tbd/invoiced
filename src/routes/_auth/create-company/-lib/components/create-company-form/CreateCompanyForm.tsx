import { createCompanyMutationOptions } from '@/api/company';
import { useAppForm } from '@/hooks/use-app-form';
import { useUser } from '@/hooks/use-user';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import {
	createCompanyFormSchema,
	useCreateCompanyDefaultValues,
} from './createCompanyFormSchema';

const appRouteApi = getRouteApi('/_auth/app');

export const CreateCompanyForm = () => {
	const user = useUser();
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
			await createCompany({
				...value,
				userId: user.id,
			});

			navigate({
				to: '/app',
			});
		},
	});

	return (
		<form.Root form={form}>
			<form.Group>
				<form.Group>
					<form.AppField
						name='name'
						children={(field) => (
							<field.TextInput
								label='Company Name'
								placeholder='Acme Inc.'
								description='Use your business name'
							/>
						)}
					/>
					<form.AppField
						name='email'
						children={(field) => (
							<field.TextInput
								label='Email'
								placeholder='john@acmeinc.com'
							/>
						)}
					/>
				</form.Group>

				<form.SubmitButton className='w-full'>Create Company</form.SubmitButton>
			</form.Group>
		</form.Root>
	);
};
