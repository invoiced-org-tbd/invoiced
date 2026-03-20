import { createCompanyMutationOptions } from '@/api/company/createCompany';
import { AddressForm } from '@/components/address-form';
import { useAppForm } from '@/hooks/use-app-form';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { CreateCompanyGeneralForm } from './CreateCompanyGeneralForm';
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
		<form.Root
			form={form}
			schema={createCompanyFormSchema}
		>
			<form.Group>
				<CreateCompanyGeneralForm
					form={form}
					fields='general'
				/>
				<AddressForm
					form={form}
					fields='address'
					fixedCountryCode='br'
					labels={{
						sectionTitle: t('createCompany.form.addressSectionTitle'),
						street1Label: t('createCompany.form.street1Label'),
						street1Placeholder: t('createCompany.form.street1Placeholder'),
						street2Label: t('createCompany.form.street2Label'),
						street2Placeholder: t('createCompany.form.street2Placeholder'),
						numberLabel: t('createCompany.form.numberLabel'),
						numberPlaceholder: t('createCompany.form.numberPlaceholder'),
						postalCodeLabel: t('createCompany.form.postalCodeLabel'),
						postalCodePlaceholder: t('createCompany.form.postalCodePlaceholder'),
						cityLabel: t('createCompany.form.cityLabel'),
						cityPlaceholder: t('createCompany.form.cityPlaceholder'),
						stateLabel: t('createCompany.form.stateLabel'),
						statePlaceholder: t('createCompany.form.statePlaceholder'),
						countryLabel: t('createCompany.form.countryLabel'),
						countryPlaceholder: t('createCompany.form.countryPlaceholder'),
					}}
				/>

				<form.SubmitButton className='w-full'>
					{t('createCompany.form.submit')}
				</form.SubmitButton>
			</form.Group>
		</form.Root>
	);
};
