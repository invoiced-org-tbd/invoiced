import { create } from 'zustand';
import type { Language, UseLanguage } from './types';
import { persist } from 'zustand/middleware';
import { LANGUAGE_COOKIE_NAME } from '@/translations/server';
import Cookies from 'js-cookie';

const LANGUAGE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

const syncLanguageCookie = (language: Language) => {
	Cookies.set(LANGUAGE_COOKIE_NAME, language, {
		path: '/',
		sameSite: 'lax',
		expires: LANGUAGE_COOKIE_MAX_AGE_SECONDS / (60 * 60 * 24),
	});
};

export const useLanguage = create<UseLanguage>()(
	persist(
		(set) => ({
			language: 'en',
			setLanguage: (language) => {
				syncLanguageCookie(language);
				set({ language });
			},
		}),
		{
			name: 'language',
			version: 0.1,
			onRehydrateStorage: () => {
				return (state) => {
					syncLanguageCookie(state?.language ?? 'en');
				};
			},
		},
	),
);
