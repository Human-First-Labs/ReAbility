import content from '../content/text-content.json';

export type Language = 'mt' | 'en';

export type ContentName = keyof typeof content;

export type Content = {
	[key3 in ContentName]?: {
		[key2 in Language]: string;
	};
};
