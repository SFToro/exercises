<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.data.session}
	Hello
	<form method="post">
		<button formaction="?/logout" type="submit">Logout</button>
	</form>
{/if}

{#if !$page.data.session}
	<form method="post">
		<button formaction="?/login&provider=github" type="submit">Github</button>
	</form>
	<form method="post">
		<button formaction="?/login" type="submit">Supabase</button>
	</form>
{/if}
