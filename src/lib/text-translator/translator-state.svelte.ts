import type { Content, ContentName, ContentSentence, Language } from './types';
import content from '../content/text-content.json';

let currentLanguage = $state<Language>();

export const setInitialLanguage = (language?: Language) => {
	currentLanguage = language || 'en';
};

export const toggleCurrentLanguage = () => {
	if (currentLanguage === 'en') {
		currentLanguage = 'mt';
	} else {
		currentLanguage = 'en';
	}

	return currentLanguage;
};

export const getCurrentLanguage = () => {
	return currentLanguage;
};

export const chooseLanguage = (parsedContent: ContentSentence) => {
	return parsedContent[currentLanguage || 'en'];
};

export const getContent = (key: ContentName) => {
	const parsedContent = content as Content;

	if (!parsedContent[key]) {
		return `${key} content is missing`;
	} else {
		return chooseLanguage(parsedContent[key]);
	}
};
