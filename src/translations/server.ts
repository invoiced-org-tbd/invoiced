import type { Language } from '@/hooks/use-language/types';
import { translate } from './translate';
import type {
	TranslationFunction,
	TranslationKey,
	TranslationRuntimeParams,
} from './types';

export const LANGUAGE_COOKIE_NAME = 'app_locale';

const isLanguage = (value: string): value is Language => {
	return value === 'en' || value === 'br';
};

export const resolveLanguage = (
	languageCandidate: string | undefined,
): Language => {
	if (!languageCandidate) {
		return 'en';
	}

	return isLanguage(languageCandidate) ? languageCandidate : 'en';
};

export const getServerT = (language: Language): TranslationFunction => {
	const runTranslate = translate as (
		language: Language,
		path: TranslationKey,
		params?: TranslationRuntimeParams,
	) => string;

	return ((...args: [TranslationKey, TranslationRuntimeParams?]) =>
		runTranslate(language, args[0], args[1])) as TranslationFunction;
};
