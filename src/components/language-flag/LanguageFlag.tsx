import { cn } from '@/lib/utils';
import { FlagBr, FlagUs } from '@sankyu/react-circle-flags';
import type { LanguageFlagProps } from './types';

export const LanguageFlag = ({
	language,
	size = 16,
	className,
	...props
}: LanguageFlagProps) => {
	const FlagComponent = language === 'en' ? FlagUs : FlagBr;

	return (
		<FlagComponent
			width={size}
			height={size}
			className={cn('shrink-0', className)}
			{...props}
		/>
	);
};
