import { setupZodErrorMap } from '@/lib/zodErrorMap';
import { useEffect } from 'react';

export const useSetupZodErrorMap = () => {
	useEffect(() => {
		setupZodErrorMap();
	}, []);
};
