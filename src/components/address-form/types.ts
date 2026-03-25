import type { CountryCode } from '@/db/tables/addressTableBase';

export type AddressFormValues = {
	street1: string;
	street2: string;
	number: string;
	postalCode: string;
	city: string;
	state: string;
	country?: CountryCode;
};

export type AddressFormLabels = {
	sectionTitle: string;
	street1Label: string;
	street1Placeholder?: string;
	street2Label: string;
	street2Placeholder?: string;
	numberLabel: string;
	numberPlaceholder?: string;
	postalCodeLabel: string;
	postalCodePlaceholder?: string;
	cityLabel: string;
	cityPlaceholder?: string;
	stateLabel: string;
	statePlaceholder?: string;
	countryLabel: string;
	countryPlaceholder?: string;
};

export type AddressFormProps = {
	labels: AddressFormLabels;
	fixedCountryCode?: CountryCode;
};
