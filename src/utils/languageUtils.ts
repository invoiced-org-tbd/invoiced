import type { Language } from '@/hooks/use-language/types';
import { useLanguage } from '@/hooks/use-language/useLanguage';
import { createTranslationFunction } from '@/translations/translate';
import type { TranslationFn } from '@/translations/types';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';

export const LANGUAGE_COOKIE_NAME = 'app_locale';

export const isLanguage = (value: string): value is Language => {
	return value === 'en' || value === 'br';
};

const resolveLanguage = (languageCandidate: string | undefined): Language => {
	if (!languageCandidate) {
		return 'en';
	}

	return isLanguage(languageCandidate) ? languageCandidate : 'en';
};

/**
 * Stateless language getter for use in server fns and outside of render cycles (e.g. zod schemas)
 */
export const getLanguage = createIsomorphicFn()
	.client(() => {
		const language = useLanguage.getState().language;
		return language;
	})
	.server(() => {
		const language = resolveLanguage(getCookie(LANGUAGE_COOKIE_NAME));
		return language;
	});

/**
 * Stateless translation function for use in server fns and outside of render cycles (e.g. zod schemas)
 */
export const getT = (): TranslationFn => {
	const language = getLanguage();
	return createTranslationFunction(language);
};
