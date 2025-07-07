import type { textContent } from '$lib/content/text-content';

export type Language = 'mt' | 'en';

export type ContentName = keyof typeof textContent;

export type ContentSentence = {
	[key2 in Language]: string;
};

export type Content = {
	[key3 in ContentName]?: ContentSentence;
};
