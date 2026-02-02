<script lang="ts">
    import type { Space } from '$lib/system/spaces/spacesService';
	import SpaceNavActions from './SpaceNavActions.svelte';

    export let spaces: Space[]
</script>

    <SpaceNavActions />
	{#if spaces.length == 0}
		<div> No Spaces Found</div>
	{/if}
	{#each spaces as {name, icon}}
		<div>{icon} -- {name}</div>
	{/each}

