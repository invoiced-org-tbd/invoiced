import { useLanguage } from '../use-language/useLanguage';
import { createTranslationFunction } from '../../translations/translate';

export const useTranslate = () => {
	const language = useLanguage((state) => state.language);
	const t = createTranslationFunction(language);

	return {
		t,
	};
};
