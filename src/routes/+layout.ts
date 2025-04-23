import type { Language } from '$lib/text-translator/types.js';
import 'mapbox-gl/dist/mapbox-gl.css';

export const load = async ({ data }) => {
	const savedLanguage = data.cookies.find((cookie) => cookie.name === 'lang')?.value as Language;

	return {
		savedLanguage
	};
};
