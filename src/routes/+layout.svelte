<script lang="ts">
	import './layout.css';
	import { AppBar, AppLayout, settings } from 'svelte-ux';
	import { mdScreen } from '@layerstack/svelte-stores';

	let { data, children } = $props();

	const { showDrawer } = settings();

	$effect(() => {
		$showDrawer = $mdScreen;
	});
</script>

{#if data.isAuthenticated}
<AppLayout>
	<svelte:fragment slot="nav">		
			<div>A -- ALPHA</div>
			<div>B -- BETA</div>
			<div>C -- CHARLIE</div>		
	</svelte:fragment>

	
		<AppBar title="Loom" class="bg-primary text-primary-content">
			<div slot="actions">
				<a href="/auth/logout">Sign out</a>
			</div>
		</AppBar>
	

	<main>
		{@render children()}
	</main>
</AppLayout>
{:else}
	<main>
		{@render children()}
	</main>
{/if}
