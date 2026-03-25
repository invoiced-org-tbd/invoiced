import {
	BadgeCheckIcon,
	ChevronsUpDownIcon,
	LanguagesIcon,
	LogOutIcon,
	MoonIcon,
	SettingsIcon,
	SunIcon,
} from 'lucide-react';
import { DropdownMenu } from '@/components/dropdown-menu';
import { Sidebar } from '@/components/sidebar';
import { useAccountDrawer } from '@/hooks/use-account-drawer';
import { useLanguage } from '@/hooks/use-language/useLanguage';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useTheme } from '@/hooks/use-theme';
import { useLogOut } from '@/hooks/use-log-out';
import { useUser } from '@/hooks/use-user';
import { LanguageFlag } from '@/components/language-flag';
import { Link } from '@tanstack/react-router';

export const SidebarUserMenu = () => {
	const user = useUser();
	const { t } = useTranslate();

	const { handleLogOut } = useLogOut();

	const setIsAccountDrawerOpen = useAccountDrawer((state) => state.setIsOpen);
	const toggleTheme = useTheme((state) => state.toggleTheme);
	const theme = useTheme((state) => state.theme);
	const language = useLanguage((state) => state.language);
	const setLanguage = useLanguage((state) => state.setLanguage);

	const displayName = user.name ?? user.email;
	const initials = displayName
		.split(' ')
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? '')
		.join('');

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<Sidebar.MenuButton
					className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground max-md:mx-auto max-md:size-8 max-md:w-8 max-md:justify-center max-md:gap-0 max-md:p-0'
					size='lg'
					tooltip={displayName}
				>
					<span
						data-size='default'
						data-slot='avatar'
						className='relative flex size-7 shrink-0 select-none items-center justify-center overflow-hidden rounded-lg bg-sidebar-accent text-sidebar-accent-foreground md:size-8'
					>
						{user.image ? (
							<img
								alt={displayName}
								className='aspect-square size-full object-cover'
								data-slot='avatar-image'
								src={user.image}
							/>
						) : (
							<span className='text-xs font-medium'>{initials}</span>
						)}
					</span>

					<div className='hidden flex-1 text-left text-sm leading-tight md:grid'>
						<span className='truncate font-medium'>{displayName}</span>
						<span className='truncate text-xs'>{user.email}</span>
					</div>

					<ChevronsUpDownIcon className='ml-auto hidden size-4 md:block' />
				</Sidebar.MenuButton>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content
				align='end'
				className='min-w-56 rounded-lg'
				side='right'
			>
				<DropdownMenu.Label className='p-0 font-normal'>
					<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
						<span
							data-size='default'
							data-slot='avatar'
							className='relative flex size-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-lg bg-sidebar-accent text-sidebar-accent-foreground'
						>
							{user.image ? (
								<img
									alt={displayName}
									className='aspect-square size-full object-cover'
									data-slot='avatar-image'
									src={user.image}
								/>
							) : (
								<span className='text-xs font-medium'>{initials}</span>
							)}
						</span>

						<div className='grid flex-1 text-left text-sm leading-tight'>
							<span className='truncate font-medium'>{displayName}</span>
							<span className='truncate text-xs'>{user.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>

				<DropdownMenu.Separator />

				<Link to='/app/settings'>
					<DropdownMenu.Item>
						<SettingsIcon />
						{t('auth.sidebar.settings.group')}
					</DropdownMenu.Item>
				</Link>
				<DropdownMenu.Item onSelect={() => toggleTheme()}>
					{theme === 'light' ? <SunIcon /> : <MoonIcon />}
					{theme === 'light' ? t('common.lightMode') : t('common.darkMode')}
				</DropdownMenu.Item>
				<DropdownMenu.Item
					onSelect={() => setLanguage(language === 'en' ? 'br' : 'en')}
				>
					<LanguagesIcon />
					{language === 'en' ? t('common.english') : t('common.portuguese')}
					<div className='ml-auto'>
						<LanguageFlag
							language={language}
							size={16}
							aria-hidden='true'
						/>
					</div>
				</DropdownMenu.Item>

				<DropdownMenu.Separator />

				<DropdownMenu.Item onSelect={() => handleLogOut()}>
					<LogOutIcon />
					{t('common.logOut')}
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};
