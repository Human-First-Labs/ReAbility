import { PUBLIC_SUPABASE_API_KEY, PUBLIC_SUPABASE_PROJECT_ID } from '$env/static/public';
import { layoutLoad } from '$lib/supabase/util';
import type { Language } from '$lib/text-translator/types.js';
import 'mapbox-gl/dist/mapbox-gl.css';

const PUBLIC_SUPABASE_URL = `https://${PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`;

export const load = async ({ data, depends, fetch }) => {
	const supabaseLayoutLoad = await layoutLoad({
		cookies: data.cookies,
		depends,
		fetch,
		supabaseApiKey: PUBLIC_SUPABASE_API_KEY,
		supabaseUrl: PUBLIC_SUPABASE_URL
	});

	const savedLanguage = data.cookies.find((cookie) => cookie.name === 'lang')?.value as Language;

	return {
		supabaseData: supabaseLayoutLoad,
		savedLanguage: savedLanguage
	};
};
