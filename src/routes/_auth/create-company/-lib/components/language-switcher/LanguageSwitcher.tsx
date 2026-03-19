import { BrazilFlag } from '@/components/flags/brazilFlag';
import { UnitedStatesFlag } from '@/components/flags/unitedStatesFlag';
import { DropdownMenu } from '@/components/dropdown-menu';
import { useLanguage } from '@/hooks/use-language/useLanguage';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import type { Language } from '@/hooks/use-language/types';
import { ChevronDownIcon } from 'lucide-react';

const LANGUAGE_OPTIONS: Array<{
	value: Language;
	labelKey: 'common.english' | 'common.portuguese';
	Flag: typeof UnitedStatesFlag;
}> = [
	{
		value: 'en',
		labelKey: 'common.english',
		Flag: UnitedStatesFlag,
	},
	{
		value: 'br',
		labelKey: 'common.portuguese',
		Flag: BrazilFlag,
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
					className='border-border bg-background hover:bg-muted text-foreground flex justify-between h-8 w-18 items-center gap-2 rounded-md border px-2 text-sm'
					aria-label='Language selector'
				>
					<currentLanguage.Flag
						className='h-4 w-auto shrink-0 rounded-[2px]'
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
					{LANGUAGE_OPTIONS.map(({ value, labelKey, Flag }) => (
						<DropdownMenu.RadioItem
							key={value}
							value={value}
						>
							<Flag
								className='h-4 w-auto shrink-0 rounded-[2px]'
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
