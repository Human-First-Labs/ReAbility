import type { ContentSentence } from '$lib/text-translator/types';

export type Article = {
	id: string;
	name: string;
	markdownContent: ContentSentence;
	type: 'vehicles' | 'wheelchairs' | 'physical-changes';
};

export const articles: Article[] = [];
