<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { AppBar, AppLayout } from 'svelte-ux';

	let { children } = $props();
</script>

<AppLayout>
	<svelte:fragment slot="nav">Here's the sidebar</svelte:fragment>

	<AppBar title="Loom" class="bg-primary text-primary-content">
		<div slot="actions">This is where the login would go</div>
	</AppBar>

	<main>
		{@render children()}
	</main>
</AppLayout>
