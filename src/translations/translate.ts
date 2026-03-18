import type { Language } from '../hooks/use-language/types';
import { brTranslations } from './br-translations';
import { enTranslations } from './en-translations';
import type {
	TranslationArguments,
	TranslationFn,
	TranslationKey,
	TranslationRuntimeParams,
	TranslationsShape,
} from './types';

const translationsByLanguage: Record<Language, TranslationsShape> = {
	en: enTranslations,
	br: brTranslations,
};

const getMessageByPath = (translations: TranslationsShape, path: string) => {
	let currentValue: unknown = translations;

	for (const segment of path.split('.')) {
		if (typeof currentValue !== 'object' || currentValue === null) {
			return undefined;
		}

		currentValue = (currentValue as Record<string, unknown>)[segment];
	}

	return typeof currentValue === 'string' ? currentValue : undefined;
};

export function translate<TPath extends TranslationKey>(
	language: Language,
	...args: TranslationArguments<TPath>
): string;
export function translate(
	language: Language,
	path: TranslationKey,
	params?: TranslationRuntimeParams,
): string {
	const translations = translationsByLanguage[language];
	const message = getMessageByPath(translations, path) ?? path;

	if (!params) {
		return message;
	}

	return message.replace(/\{([^}]+)\}/g, (match, key: string) => {
		const value = params[key];
		return value === undefined ? match : String(value);
	});
}

export const createTranslationFunction = (
	language: Language,
): TranslationFn => {
	const runTranslate = translate as (
		language: Language,
		path: TranslationKey,
		params?: TranslationRuntimeParams,
	) => string;

	return ((...args: [TranslationKey, TranslationRuntimeParams?]) =>
		runTranslate(language, args[0], args[1])) as TranslationFn;
};
