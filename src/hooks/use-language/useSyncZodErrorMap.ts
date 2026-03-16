import { useEffect } from 'react';
import { setupZodErrorMap } from '@/translations/zod-error-map';
import { useLanguage } from './useLanguage';

export const useSyncZodErrorMap = () => {
	const language = useLanguage((state) => state.language);

	useEffect(() => {
		setupZodErrorMap(language);
	}, [language]);
};
