<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { each } from 'svelte/internal';

	let payloads = [];
	let channel;

	onMount(() => {
		$page.data.supabase
			.channel('any')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'Titles' }, (payload) => {
				console.log('Change received!', payload);
				// payloads = [...payloads, payload];
				payloads.push(payload);
				payload = payload;
			})
			.subscribe((status) => {
				if (status === 'SUBSCRIBED') {
					console.log('subscribed to postgres changes: ', status);
				}
			});

		channel = $page.data.supabase.channel('testChannel', {
			config: {
				broadcast: {
					self: true
				}
			}
		});

		channel
			.on('broadcast', { event: 'myevent' }, (payload) => {
				console.log(payload);
				payloads.push(payload);
			})
			.subscribe((status) => {
				if (status === 'SUBSCRIBED') {
					console.log('subscribed to broadcast: ', status);
				}
			});
	});
</script>

<form action="?/add" method="post" use:enhance>
	<label for="title">Title</label>
	<input name="title" id="title" type="text" />
	<button type="submit">Enviar</button>
</form>
<button
	on:click={() => {
		channel.send({
			type: 'broadcast',
			event: 'myevent',
			payload: { org: 'salvabase' }
		});
	}}>Broadcast</button
>
<pre>
	{#each payloads as payload}
		{JSON.stringify(payload, ' ', null)}
	{/each}
</pre>
