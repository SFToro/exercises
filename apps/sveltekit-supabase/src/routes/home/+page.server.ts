import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!(await locals.getSession())) {
		// console.log('Not authorized');
	}
	const session = await locals.getSession();

	return { session };
};
