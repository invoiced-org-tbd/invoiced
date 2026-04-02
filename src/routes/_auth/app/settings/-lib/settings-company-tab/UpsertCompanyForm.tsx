import { createCompanyMutationOptions } from '@/api/company/createCompany';
import type { GetCompanyResponse } from '@/api/company/getCompany';
import { companyUpsertFormSchema } from '@/api/company/companyUpsertSchema';
import type { CompanyUpsertFormSchema } from '@/api/company/companyUpsertSchema';
import { updateCompanyMutationOptions } from '@/api/company/updateCompany';
import { AddressForm } from '@/components/address-form/AddressForm';
import { Drawer } from '@/components/drawer/Drawer';
import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';

type UpsertCompanyFormProps = {
	mode: 'create' | 'edit';
	company?: GetCompanyResponse;
	onClose: () => void;
	onSuccess?: () => void;
};

const useUpsertCompanyFormDefaultValues = ({
	mode,
	company,
}: {
	mode: UpsertCompanyFormProps['mode'];
	company?: UpsertCompanyFormProps['company'];
}) => {
	return {
		defaultValues:
			mode === 'edit' && company
				? {
						general: {
							name: company.name,
							email: company.email,
						},
						address: {
							street1: company.address?.street1 ?? '',
							street2: company.address?.street2 ?? '',
							number: company.address?.number ?? '',
							postalCode: company.address?.postalCode ?? '',
							city: company.address?.city ?? '',
							state: company.address?.state ?? '',
						},
					}
				: {
						general: {
							name: '',
							email: '',
						},
						address: {
							street1: '',
							street2: '',
							number: '',
							postalCode: '',
							city: '',
							state: '',
						},
					},
	} satisfies {
		defaultValues: CompanyUpsertFormSchema;
	};
};

export const UpsertCompanyForm = ({
	mode,
	company,
	onClose,
	onSuccess,
}: UpsertCompanyFormProps) => {
	const { t } = useTranslate();
	const { mutateAsync: createCompany } = useMutation(
		createCompanyMutationOptions(),
	);
	const { mutateAsync: updateCompany } = useMutation(
		updateCompanyMutationOptions(),
	);
	const { defaultValues } = useUpsertCompanyFormDefaultValues({
		mode,
		company,
	});

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: companyUpsertFormSchema,
		},
		onSubmit: async ({ value }) => {
			if (mode === 'edit') {
				await updateCompany(value);
			} else {
				await createCompany(value);
			}
			onSuccess?.();
		},
	});

	return (
		<form.Root
			form={form}
			schema={companyUpsertFormSchema}
		>
			<Drawer.Body>
				<form.Group>
					<form.AppField
						name='general.name'
						children={(field) => (
							<field.TextInput
								label={t('createCompany.form.nameLabel')}
								placeholder={t('createCompany.form.namePlaceholder')}
								description={t('createCompany.form.nameDescription')}
							/>
						)}
					/>
					<form.AppField
						name='general.email'
						children={(field) => (
							<field.TextInput
								label={t('common.email')}
								placeholder={t('createCompany.form.emailPlaceholder')}
							/>
						)}
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
							postalCodePlaceholder: t(
								'createCompany.form.postalCodePlaceholder',
							),
							cityLabel: t('createCompany.form.cityLabel'),
							cityPlaceholder: t('createCompany.form.cityPlaceholder'),
							stateLabel: t('createCompany.form.stateLabel'),
							statePlaceholder: t('createCompany.form.statePlaceholder'),
							countryLabel: t('createCompany.form.countryLabel'),
							countryPlaceholder: t('createCompany.form.countryPlaceholder'),
						}}
					/>
				</form.Group>
			</Drawer.Body>

			<Drawer.Footer>
				<form.CancelButton
					size='sm'
					onClick={onClose}
				/>
				<form.SubmitButton
					size='sm'
					className='ml-auto'
				>
					{mode === 'edit'
						? t('settings.tabs.company.drawer.saveAction')
						: t('createCompany.form.submit')}
				</form.SubmitButton>
			</Drawer.Footer>
		</form.Root>
	);
};
