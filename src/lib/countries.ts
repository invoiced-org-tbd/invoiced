import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { TranslationKey } from '@/translations/types';
import z from 'zod';

type BaseCountry = {
	name: TranslationKey;
	// ISO 3166 country code
	code: string;
	// ISO 4217 currency code
	currencyCode: string;
};
export const countries = [
	{
		name: 'countries.unitedStates',
		code: 'us',
		currencyCode: 'USD',
	},
	{
		name: 'countries.brazil',
		code: 'br',
		currencyCode: 'BRL',
	},
	{
		name: 'countries.canada',
		code: 'ca',
		currencyCode: 'CAD',
	},
	{
		name: 'countries.australia',
		code: 'au',
		currencyCode: 'AUD',
	},
	{
		name: 'countries.unitedKingdom',
		code: 'gb',
		currencyCode: 'GBP',
	},
	{
		name: 'countries.argentina',
		code: 'ar',
		currencyCode: 'ARS',
	},
	{
		name: 'countries.portugal',
		code: 'pt',
		currencyCode: 'EUR',
	},
	{
		name: 'countries.mexico',
		code: 'mx',
		currencyCode: 'MXN',
	},
	{
		name: 'countries.germany',
		code: 'de',
		currencyCode: 'EUR',
	},
	{
		name: 'countries.estonia',
		code: 'ee',
		currencyCode: 'EUR',
	},
	{
		name: 'countries.austria',
		code: 'at',
		currencyCode: 'EUR',
	},
	{
		name: 'countries.lithuania',
		code: 'lt',
		currencyCode: 'EUR',
	},
	{
		name: 'countries.netherlands',
		code: 'nl',
		currencyCode: 'EUR',
	},
] as const satisfies BaseCountry[];

export type Country = (typeof countries)[number];

export const countryCodes = countries.map((country) => country.code);
export const countryCodeEnumSchema = z.enum(countryCodes);
export type CountryCode = z.infer<typeof countryCodeEnumSchema>;

export const getCountryByCode = (countryCode: Country['code']) => {
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
