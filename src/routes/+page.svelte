<script lang="ts">
	import type { Account } from '$lib/system/accounts/accountsService';
	import { Button } from 'svelte-ux';

	let {data } = $props()

	//need to figure out how to make this a store/rune/etc/reactive/etc.
	let users = data?.users ? data.users : []
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Button variant="outline">Click me!</Button>

	{#if users.length === 0}
		<div>no users found</div>
	{/if}
	{#each users as {username, created}}
		<div>{username} -- {created}</div>
	{/each}
