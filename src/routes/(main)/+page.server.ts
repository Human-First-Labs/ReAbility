import { fail } from '@sveltejs/kit';

export const actions = {
	setLanguageCookie: async ({ cookies, request }) => {
		const body = await request.json();

		if (!body.lang) {
			return fail(400, {
				message: 'Language is required'
			});
		}

		try {
			cookies.set('lang', body.lang, {
				path: '/'
			});

			return;
		} catch (e) {
			console.error(e);
			return fail(500, {
				message: 'Failed to set language'
			});
		}
	}
};
