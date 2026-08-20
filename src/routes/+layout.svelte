<script lang="ts">
	import './layout.css';
	import { AppBar, AppLayout } from 'svelte-ux';

	let { data, children } = $props();
</script>

<AppLayout>
	<svelte:fragment slot="nav">
		<div>A -- ALPHA</div>
		<div>B -- BETA</div>
		<div>C -- CHARLIE</div>
	</svelte:fragment>

	<AppBar title="Loom" class="bg-primary text-primary-content">
		<div slot="actions">
			{#if data.isAuthenticated}
				<a href="/auth/logout">Sign out</a>
			{/if}
		</div>
	</AppBar>

	<main>
		{@render children()}
	</main>
</AppLayout>
