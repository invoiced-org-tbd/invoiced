import type { Country } from '@/db/tables/addressTableBase';
import { countries } from '@/db/tables/addressTableBase';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { TranslationKey } from '@/translations/types';

export type BaseCountry = {
	name: TranslationKey;
	// ISO 3166 country code
	code: string;
	// ISO 4217 currency code
	currencyCode: string;
};

const getCountryByCode = (countryCode: Country['code']) => {
	return countries.find((country) => country.code === countryCode);
};

export const useGetCountryName = () => {
	const { t } = useTranslate();

	const getCountryName = (countryCode: Country['code']) => {
		const country = getCountryByCode(countryCode);
		if (!country) {
			return t('countries.notFound', { country: countryCode });
		}

		return t(country.name);
	};

	return {
		getCountryName,
	};
};

export const useCountryItems = () => {
	const { getCountryName } = useGetCountryName();

	const countryItems = countries.map((country) => ({
		label: getCountryName(country.code),
		value: country.code,
	}));

	return { countryItems };
};
