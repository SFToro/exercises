import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const actions: Actions = {
	add: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		console.log(data);
		const dbRes = await locals.supabase.from('Titles').insert([
			{
				title: data.title
			}
		]);

		console.log(dbRes);
	}
};

export const load: PageServerLoad = async () => {
	console.log('add-data ran');
};
