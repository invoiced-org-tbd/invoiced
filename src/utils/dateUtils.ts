import type { Language } from '@/hooks/use-language/types';
import { format, isValid, parseISO } from 'date-fns';
import { getLanguage } from './languageUtils';
import { ptBR, enUS } from 'date-fns/locale';

const getLocale = (language: Language) => {
	return language === 'br' ? ptBR : enUS;
};
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

type FormatUpdatedAtParams = {
	date: Date;
	language?: Language;
};
export const formatUpdatedAt = ({ date, language }: FormatUpdatedAtParams) => {
	const resolvedLanguage = language ?? getLanguage();

	return format(date, 'PPp', {
		locale: getLocale(resolvedLanguage),
	});
};
