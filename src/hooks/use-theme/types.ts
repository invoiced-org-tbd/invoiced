export type Theme = 'light' | 'dark';

export type UseThemeProps = {
	theme: Theme;
};

export type UseThemeActions = {
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
};

export type UseTheme = UseThemeProps & UseThemeActions;
