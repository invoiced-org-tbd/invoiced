import { useTheme } from '@/hooks/use-theme/useTheme';
import { Button } from '../button';
import { MoonIcon, SunIcon } from 'lucide-react';

export const ThemeSwitcher = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			isOutlined
			variant='secondary'
			onClick={toggleTheme}
			className='px-2 bg-background/50'
		>
			{theme === 'dark' ? (
				<SunIcon className='size-4' />
			) : (
				<MoonIcon className='size-4' />
			)}
		</Button>
	);
};
