import type { CountryCode } from '@/db/tables/addressTableBase';
import { useGetCountryName } from '@/lib/countries';

export type AddressLike = {
	street1: string;
	street2: string | null;
	number: string;
	postalCode: string;
	city: string;
	state: string;
	country: CountryCode;
};

type FormatAddressSingleLineParams = {
	address: AddressLike;
};

export const useFormatAddressSingleLine = () => {
	const { getCountryName } = useGetCountryName();

	const formatAddress = ({ address }: FormatAddressSingleLineParams) => {
		const { country, street1, street2, number, postalCode, city, state } =
			address;
		const countryName = getCountryName(country ?? 'us');

		return `${street1} ${street2 ?? ''} ${number} ${postalCode} ${city} ${state} ${countryName}`;
	};

	return {
		formatAddress,
	};
};
