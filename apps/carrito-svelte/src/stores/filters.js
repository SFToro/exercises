import { writable } from "svelte/store";

const filters = writable({price:500, category:"all"})

export default filters