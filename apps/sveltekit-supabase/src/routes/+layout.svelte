<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			console.log(event, session);
			invalidate('supabase:auth');
		});

		return () => subscription.unsubscribe();
	});
</script>

{#if !data.session}
	Not logged in
{:else}
	Logged in
{/if}
<header>
	<h1>Supabase test</h1>
	<nav><a href="/home">Home</a></nav>
	<nav><a href="/add-data">Add</a></nav>
	<nav><a href="/">Start</a></nav>
</header>

<slot />
