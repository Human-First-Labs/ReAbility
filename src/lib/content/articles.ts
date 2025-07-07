import type { ContentSentence } from '$lib/text-translator/types';

export type ArticleType = 'vehicles' | 'wheelchairs' | 'physical-changes';

export type Article = {
	id: string;
	name: string;
	markdownContent: ContentSentence;
	type: ArticleType;
	date: Date;
	previewImageUrl: string;
};

export const articles: Article[] = [];
