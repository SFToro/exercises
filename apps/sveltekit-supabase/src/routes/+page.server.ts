import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { EMAIL, PASSWORD } from '$env/static/private';

export const load: PageServerLoad = async ({ locals }) => {
	console.log('/ load function');
	const session = await locals.getSession();
	console.log(session?.user.email);
	return { session };
};

export const actions: Actions = {
	login: async ({ url, locals }) => {
		const provider = url.searchParams.get('provider') as Provider;

		if (provider) {
			const { data, error: err } = await locals.supabase.auth.signInWithOAuth({ provider });
			if (err) {
				return fail(400, { message: 'Something went wrong' });
			}
			throw redirect(303, data.url);
		}

		// Direct sign In with password from env variables
		const { data, error: err } = await locals.supabase.auth.signInWithPassword({
			email: EMAIL,
			password: PASSWORD
		});
		if (err instanceof AuthApiError && err.status === 400) {
			return fail(401, { message: 'Invalid credentials' });
		}
		throw redirect(303, '/home');
	},
	logout: async ({ locals }) => {
		const { error: err } = await locals.supabase.auth.signOut();
		console.log(err);
	}
};
