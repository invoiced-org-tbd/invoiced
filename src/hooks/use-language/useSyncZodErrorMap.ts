import { useEffect } from 'react';
import { setupZodErrorMap } from '@/lib/zodErrorMap';
import { useLanguage } from './useLanguage';

export const useSyncZodErrorMap = () => {
	const language = useLanguage((state) => state.language);

	useEffect(() => {
		setupZodErrorMap(language);
	}, [language]);
};
