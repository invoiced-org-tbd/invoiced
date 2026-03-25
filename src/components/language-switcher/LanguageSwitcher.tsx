import { LanguageFlag } from '@/components/language-flag/LanguageFlag';
import { DropdownMenu } from '@/components/dropdown-menu/DropdownMenu';
import { useLanguage } from '@/hooks/use-language/useLanguage';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { Language } from '@/hooks/use-language/types';
import { ChevronDownIcon } from 'lucide-react';

const LANGUAGE_OPTIONS: Array<{
	value: Language;
	labelKey: 'common.english' | 'common.portuguese';
}> = [
	{
		value: 'en',
		labelKey: 'common.english',
	},
	{
		value: 'br',
		labelKey: 'common.portuguese',
	},
];

export const LanguageSwitcher = () => {
	const { t } = useTranslate();
	const language = useLanguage((state) => state.language);
	const setLanguage = useLanguage((state) => state.setLanguage);

	const currentLanguage =
		LANGUAGE_OPTIONS.find((option) => option.value === language) ??
		LANGUAGE_OPTIONS[0];

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button
					type='button'
					className='border-secondary bg-background/50 hover:bg-muted text-foreground flex justify-between h-8 items-center gap-2 rounded-md border px-2 text-sm'
					aria-label='Language selector'
				>
					<LanguageFlag
						language={currentLanguage.value}
						size={16}
						aria-hidden='true'
					/>
					<ChevronDownIcon className='size-4 text-muted-foreground' />
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content
				align='end'
				className='min-w-44'
			>
				<DropdownMenu.RadioGroup
					value={language}
					onValueChange={(value) => setLanguage(value as Language)}
				>
					{LANGUAGE_OPTIONS.map(({ value, labelKey }) => (
						<DropdownMenu.RadioItem
							key={value}
							value={value}
						>
							<LanguageFlag
								language={value}
								size={16}
								aria-hidden='true'
							/>
							{t(labelKey)}
						</DropdownMenu.RadioItem>
					))}
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};
