import type { Content, ContentName, ContentSentence, Language } from './types';
import content from '../content/text-content.json';

let currentLangauge = $state<Language>();

export const setInitialLanguage = (language?: Language) => {
	currentLangauge = language || 'en';
};

export const toggleCurrentLanguage = () => {
	if (currentLangauge === 'en') {
		currentLangauge = 'mt';
	} else {
		currentLangauge = 'en';
	}

	return currentLangauge;
};

export const getCurrentLanguage = () => {
	return currentLangauge;
};

export const chooseLanguage = (parsedContent: ContentSentence) => {
	return parsedContent[currentLangauge || 'en'];
};

export const getContent = (key: ContentName) => {
	const parsedContent = content as Content;

	if (!parsedContent[key]) {
		return `${key} content is missing`;
	} else {
		return chooseLanguage(parsedContent[key]);
	}
};
