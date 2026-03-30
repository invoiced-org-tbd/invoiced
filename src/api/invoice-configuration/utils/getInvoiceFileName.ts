import type { InvoiceConfigurationPersistSchema } from '@/routes/_auth/app/contracts/-lib/contracts-upsert-form/invoiceConfigurationFormSchemas';

type GetInvoiceFileNameParams = {
	invoiceConfiguration: InvoiceConfigurationPersistSchema;
	companyName: string;
	dayOfMonth: number;
};

// characters not safe for filename segments to be replaced with _
const unsafeFilenameSegmentChars = /[^a-zA-Z0-9_-]+/g;

const sanitizeFilenameSegment = (value: string) => {
	return value
		.replace(unsafeFilenameSegmentChars, '_')
		.replace(/_+/g, '_') // remove multiple underscores
		.replace(/^_+|_+$/g, ''); // remove leading and trailing underscores
};

const isValidDayOfMonth = (value: number) =>
	Number.isInteger(value) && value >= 1 && value <= 31;

export const getInvoiceFileName = ({
	invoiceConfiguration,
	companyName,
	dayOfMonth,
}: GetInvoiceFileNameParams) => {
	let invoiceFileName = '';

	const sanitizedPrefix = sanitizeFilenameSegment(invoiceConfiguration.prefix);
	if (!sanitizedPrefix) {
		return { invoiceFileName };
	}

	const parts: string[] = [
		sanitizedPrefix,
		String(invoiceConfiguration.lastInvoiceNumber || 1).padStart(3, '0'),
	];

	if (invoiceConfiguration.withCompanyName) {
		const trimmed = companyName.trim();
		const sanitizedCompany = sanitizeFilenameSegment(trimmed);
		if (trimmed && sanitizedCompany) {
			parts.push(sanitizedCompany);
		}
	}

	if (invoiceConfiguration.withDay && isValidDayOfMonth(dayOfMonth)) {
		parts.push(String(dayOfMonth).padStart(2, '0'));
	}

	if (invoiceConfiguration.withMonth) {
		parts.push(String(new Date().getMonth() + 1).padStart(2, '0'));
	}

	if (invoiceConfiguration.withYear) {
		parts.push(String(new Date().getFullYear()));
	}

	const sanitizedSuffix = sanitizeFilenameSegment(invoiceConfiguration.suffix);
	if (sanitizedSuffix) {
		parts.push(sanitizedSuffix);
	}
	invoiceFileName = parts.join('-');

	return { invoiceFileName };
};
