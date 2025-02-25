export type Language = 'mt' | 'en';

export type ContentName = 'section-1' | 'section-2';

export type Content = {
	[key3 in ContentName]: {
		[key2 in Language]: string;
	};
};
