import { getLanguage } from './languageUtils';

export const toTitleCase = (value: string) => {
	return value
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.split(' ')
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export const getOrdinalSuffix = (value: number) => {
	const language = getLanguage();
	if (language === 'br') {
		return 'º';
	}

	return value === 1 ? 'st' : value === 2 ? 'nd' : value === 3 ? 'rd' : 'th';
};
