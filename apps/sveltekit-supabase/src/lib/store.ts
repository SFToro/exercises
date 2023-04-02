import { writable } from 'svelte/store';

function createStore(initialValue: any) {
	return writable(initialValue);
}

export const cartStore = createStore;
