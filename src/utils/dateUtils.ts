import { format, isValid, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const toDate = (value: unknown): Date | null => {
	if (value instanceof Date) {
		return isValid(value) ? value : null;
	}

	if (typeof value === 'number') {
		const parsedDate = new Date(value);
		return isValid(parsedDate) ? parsedDate : null;
	}

	if (typeof value === 'string') {
		const trimmedValue = value.trim();
		if (!trimmedValue) {
			return null;
		}

		const isoParsedDate = parseISO(trimmedValue);
		if (isValid(isoParsedDate)) {
			return isoParsedDate;
		}

		const fallbackParsedDate = new Date(trimmedValue);
		return isValid(fallbackParsedDate) ? fallbackParsedDate : null;
	}

	return null;
};

export const formatInvoiceIssueDate = (date: Date) => {
	return format(date, 'MMM d, yyyy', {
		locale: enUS,
	});
};
