type CommonInvoiceConfiguration = {
	prefix: string;
	suffix: string | null;
	withYear: boolean;
	withMonth: boolean;
	withDay: boolean;
	lastInvoiceNumber: number;
	withCompanyName: boolean;
};

type GetInvoiceFileNameParams = {
	invoiceConfiguration: CommonInvoiceConfiguration;
	companyName: string;
	date: Date;
};

// characters not safe for filename segments to be replaced with _
const unsafeFilenameSegmentChars = /[^a-zA-Z0-9_-]+/g;

const sanitizeFilenameSegment = (value?: string | null) => {
	if (!value) {
		return '';
	}

	return value
		.replace(unsafeFilenameSegmentChars, '_')
		.replace(/_+/g, '_') // remove multiple underscores
		.replace(/^_+|_+$/g, ''); // remove leading and trailing underscores
};

export const getInvoiceFileName = ({
	invoiceConfiguration,
	companyName,
	date,
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

	if (invoiceConfiguration.withDay) {
		const day = date.getDate();

		parts.push(String(day).padStart(2, '0'));
	}

	if (invoiceConfiguration.withMonth) {
		const month = date.getMonth() + 1;

		parts.push(String(month).padStart(2, '0'));
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
