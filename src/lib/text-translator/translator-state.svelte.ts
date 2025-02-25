import type { Language } from './types';

let currentLangauge = $state<Language>('en');

export const toggleCurrentLanguage = () => {
	if (currentLangauge === 'en') {
		currentLangauge = 'mt';
	} else {
		currentLangauge = 'en';
	}
};

export const getCurrentLanguage = () => {
	return currentLangauge;
};
