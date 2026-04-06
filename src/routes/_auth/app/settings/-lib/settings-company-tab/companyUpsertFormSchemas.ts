import { addressFormSchema } from '@/components/address-form/addressFormSchemas';
import { useCompany } from '@/hooks/use-company/useCompany';
import { translate } from '@/translations/translate';
import { getLanguage } from '@/utils/languageUtils';
import z from 'zod';

const requiredMessage = translate(getLanguage(), 'validation.required');
const invalidEmailMessage = translate(getLanguage(), 'validation.invalidEmail');

const generalFormSchema = z.object({
	name: z.string().min(1, {
		message: requiredMessage,
	}),
	email: z.email({
		message: invalidEmailMessage,
	}),
});

export const companyUpsertFormSchema = z.object({
	general: generalFormSchema,
	address: addressFormSchema,
});

export type CompanyUpsertFormSchema = z.infer<typeof companyUpsertFormSchema>;

type UseUpsertCompanyFormDefaultValuesParams = {
	isEditingCompany?: boolean;
};
export const useUpsertCompanyFormDefaultValues = ({
	isEditingCompany,
}: UseUpsertCompanyFormDefaultValuesParams) => {
	const { company } = useCompany();

	const editCompany = isEditingCompany ? company : undefined;

	return {
		defaultValues: {
			general: {
				name: editCompany?.name ?? '',
				email: editCompany?.email ?? '',
			},
			address: {
				street1: editCompany?.address?.street1 ?? '',
				street2: editCompany?.address?.street2 ?? '',
				number: editCompany?.address?.number ?? '',
				postalCode: editCompany?.address?.postalCode ?? '',
				city: editCompany?.address?.city ?? '',
				state: editCompany?.address?.state ?? '',
			},
		} satisfies CompanyUpsertFormSchema,
	};
};
