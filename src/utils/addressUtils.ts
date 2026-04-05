import type { GetContractsResponse } from '@/api/contract/getContracts';
import type { AddressFormValues } from '@/components/address-form/types';
import { useGetCountryName } from '@/lib/countries';

type Address =
	| AddressFormValues
	| GetContractsResponse[number]['client']['address'];

type FormatAddressSingleLineParams = {
	address: Address;
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
