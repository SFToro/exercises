<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>Home</h1>
{#if $page.data.session}
	Hello {$page.data.session.user.email}
{/if}
