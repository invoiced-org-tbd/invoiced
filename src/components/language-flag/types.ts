import type { Language } from '@/hooks/use-language/types';
import type { SVGProps } from 'react';

export type LanguageFlagProps = Omit<
	SVGProps<SVGSVGElement>,
	'width' | 'height'
> & {
	language: Language;
	size?: number;
};
