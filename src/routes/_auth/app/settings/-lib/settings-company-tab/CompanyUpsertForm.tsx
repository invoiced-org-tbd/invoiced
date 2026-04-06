import { createCompanyMutationOptions } from '@/api/company/createCompany';
import { updateCompanyMutationOptions } from '@/api/company/updateCompany';
import { AddressForm } from '@/components/address-form/AddressForm';
import { Drawer } from '@/components/drawer/Drawer';
import { useAppForm } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useMutation } from '@tanstack/react-query';
import {
	companyUpsertFormSchema,
	useUpsertCompanyFormDefaultValues,
} from './companyUpsertFormSchemas';
import { runAfterSubmitSuccess } from '@/components/form/utils';

type UpsertCompanyFormProps = {
	isEditingCompany?: boolean;
	onClose: () => void;
};
export const CompanyUpsertForm = ({
	isEditingCompany,
	onClose,
}: UpsertCompanyFormProps) => {
	const { t } = useTranslate();

	const { mutateAsync: createCompany } = useMutation(
		createCompanyMutationOptions(),
	);
	const { mutateAsync: updateCompany } = useMutation(
		updateCompanyMutationOptions(),
	);

	const { defaultValues } = useUpsertCompanyFormDefaultValues({
		isEditingCompany,
	});

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: companyUpsertFormSchema,
		},
		onSubmit: async ({ value }) => {
			if (isEditingCompany) {
				await updateCompany({ form: value });
			} else {
				await createCompany({ form: value });
			}

			runAfterSubmitSuccess({
				form,
				action: onClose,
			});
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

			<Drawer.Footer className='justify-end'>
				<Drawer.Close asChild>
					<form.CancelButton />
				</Drawer.Close>

				<form.SubmitButton />
			</Drawer.Footer>
		</form.Root>
	);
};
