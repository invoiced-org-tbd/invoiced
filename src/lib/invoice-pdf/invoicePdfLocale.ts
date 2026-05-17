import type { Country } from '@/db/tables/addressTableBase';
import { getCountryDisplayName } from '@/lib/countries';
import type { Language } from '@/hooks/use-language/types';
import { createTranslationFunction } from '@/translations/translate';

/** Invoice PDF copy is English-only; country names must not follow UI locale. */
export const INVOICE_PDF_LANGUAGE = 'en' satisfies Language;

const invoicePdfT = createTranslationFunction(INVOICE_PDF_LANGUAGE);

export const getInvoicePdfCountryName = (countryCode: Country['code']) =>
	getCountryDisplayName(invoicePdfT, countryCode);
