import type { Content, ContentName, Language } from './types';
import content from '../content/text-content.json';

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

export const getContent = (key: ContentName) => {
	const parsedContent = content as Content;

	if (!parsedContent[key]) {
		return `${key} content is missing`;
	} else {
		return parsedContent[key][currentLangauge];
	}
};
