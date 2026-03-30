import type { Language } from '@/hooks/use-language/types';
import { getLanguage } from './languageUtils';

export const toTitleCase = (value: string) => {
	return value
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.split(' ')
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export const getOrdinalSuffix = (value: number, language?: Language) => {
	const resolvedLanguage = language ?? getLanguage();

	if (resolvedLanguage === 'br') {
		return 'º';
	}

	if (value === 1) {
		return 'st';
	}
	if (value === 2) {
		return 'nd';
	}
	if (value === 3) {
		return 'rd';
	}

	return 'th';
};

export const slugify = (value: string) => {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-{2,}/g, '-');
};
