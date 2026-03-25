import type { Language } from '@/hooks/use-language/types';
import { useLanguage } from '@/hooks/use-language/useLanguage';
import { translate } from '@/translations/translate';
import type {
	TranslationFn,
	TranslationKey,
	TranslationRuntimeParams,
} from '@/translations/types';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';

export const LANGUAGE_COOKIE_NAME = 'app_locale';

const isLanguage = (value: string): value is Language => {
	return value === 'en' || value === 'br';
};

const resolveLanguage = (languageCandidate: string | undefined): Language => {
	if (!languageCandidate) {
		return 'en';
	}

	return isLanguage(languageCandidate) ? languageCandidate : 'en';
};

export const getServerT = (language: Language): TranslationFn => {
	const runTranslate = translate as (
		language: Language,
		path: TranslationKey,
		params?: TranslationRuntimeParams,
	) => string;

	return ((...args: [TranslationKey, TranslationRuntimeParams?]) =>
		runTranslate(language, args[0], args[1])) as TranslationFn;
};

export const getLanguage = createIsomorphicFn()
	.client(() => {
		const language = useLanguage.getState().language;
		return language;
	})
	.server(() => {
		const language = resolveLanguage(getCookie(LANGUAGE_COOKIE_NAME));
		return language;
	});
