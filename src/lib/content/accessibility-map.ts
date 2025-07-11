import type { ContentSentence } from '$lib/text-translator/types';

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

export const mapData: MapItem[] = [
	{
		id: '1',
		name: {
			en: "Ta' Qali Park",
			mt: "Il-Park ta' Ta' Qali"
		},
		description: {
			en: "Ta' Qali Park is a large public park in the centre of Malta. It is still used for agriculture, but also for sports, concerts, and other activities.",
			mt: "Il-Park ta' Ħal-Tarxien huwa park pubbliku kbir fil-qalba ta' Malta. Huwa għadu użat għall-agrikoltura, iżda wkoll għall-isports, kuncerti, u attivitajiet oħra."
		},
		latitude: 35.8956,
		longitude: 14.4422,
		googleMapsLink: 'https://goo.gl/maps/7ZQ7Q5Q7Q7Q7',
		'accessibility-information': {
			'overall-rating-1-5': 4,
			text: {
				en: '',
				mt: ''
			},
			'specific-issues': [
				{
					name: {
						en: '',
						mt: ''
					},
					description: {
						en: '',
						mt: ''
					},
					image: ''
				}
			],
			'accessibility-features-1-5': {
				parking: 4,
				toilets: 3,
				paths: 4,
				seating: 4,
				shelter: 4,
				assistance: 4
			}
		}
	},
	{
		id: '2',
		name: {
			en: 'Valletta',
			mt: 'Il-Belt Valletta'
		},
		description: {
			en: 'Valletta is the capital city of Malta. It is a UNESCO World Heritage Site, and is known for its historic buildings, museums, and gardens.',
			mt: "Il-Belt Valletta hi l-kapitali ta' Malta. Hi sit tal-Patrimonju Dinji tal-UNESCO, u hija magħrufa għall-bini storiku żgħir, mużewijiet, u ġonna."
		},
		latitude: 35.8989,
		longitude: 14.5146,
		googleMapsLink: 'https://goo.gl/maps/7ZQ7Q5Q7Q7Q7',
		'accessibility-information': {
			'overall-rating-1-5': 3,
			text: {
				en: '',
				mt: ''
			},
			'specific-issues': [
				{
					name: {
						en: '',
						mt: ''
					},
					description: {
						en: '',
						mt: ''
					},
					image: ''
				}
			],
			'accessibility-features-1-5': {
				parking: 4,
				toilets: 3,
				paths: 4,
				seating: 4,
				shelter: 4,
				assistance: 4
			}
		}
	}
];
