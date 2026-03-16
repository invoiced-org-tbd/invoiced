export type Language = 'en' | 'br';

export type UseLanguageProps = {
	language: Language;
};

export type UseLanguageActions = {
	setLanguage: (language: Language) => void;
};

export type UseLanguage = UseLanguageProps & UseLanguageActions;
