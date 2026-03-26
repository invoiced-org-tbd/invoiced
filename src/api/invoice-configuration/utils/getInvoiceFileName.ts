import type { InvoiceConfigurationFormSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/invoiceConfigurationFormSchemas';

type GetInvoiceFileNameParams = {
	invoiceConfiguration: InvoiceConfigurationFormSchema;
	companyName: string;
	dayOfMonth: number;
};

// TODO: REFACTOR. LOOKS LIKE CRAP. TRY TO MAKE IT BETTER.

export const getInvoiceFileName = ({
	invoiceConfiguration,
	companyName,
	dayOfMonth,
}: GetInvoiceFileNameParams) => {
	let fileName = '';

	// INV-Crewfare_llc-25-03-2026

	// INV-
	if (invoiceConfiguration.prefix) {
		fileName += invoiceConfiguration.prefix;
	}

	if (invoiceConfiguration.withYear) {
		fileName += new Date().getFullYear();
	}
	if (invoiceConfiguration.withMonth) {
		fileName += new Date().getMonth() + 1;
	}
	if (invoiceConfiguration.withDay) {
		fileName += dayOfMonth;
	}

	if (invoiceConfiguration.withCompanyName) {
		fileName += companyName;
	}
	if (invoiceConfiguration.suffix) {
		fileName += invoiceConfiguration.suffix;
	}

	return { fileName };
};
