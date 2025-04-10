import type { ContentSentence } from '$lib/text-translator/types';

export type SiteSection = '' | 'research' | 'reboot' | 'resources' | 'reach-out';
export const siteSections: SiteSection[] = ['', 'research', 'reboot', 'resources', 'reach-out'];

export const navigationOrder = [
	`/${siteSections[0]}`,
	`/${siteSections[1]}`,
	`/${siteSections[2]}`,
	`/${siteSections[3]}`,
	`/${siteSections[4]}`
];

export type MapItem = {
	id: string;
	name: ContentSentence;
	description: ContentSentence;
	latitude: number;
	longitude: number;
	googleMapsLink: string;
	'accessibility-information': {
		'overall-rating-1-5': number;
		text: ContentSentence;
		'specific-issues': {
			name: ContentSentence;
			description: ContentSentence;
			image: string;
		}[];
		'accessibility-features-1-5': {
			parking: number;
			toilets: number;
			paths: number;
			seating: number;
			shelter: number;
			assistance: number;
		};
	};
};
