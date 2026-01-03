<script lang="ts">
    import type { Space } from '$lib/system/spaces/spacesService';

    export let spaces: Space[]
</script>

<!-- TODO all this junk inside the svelte:fragment needs to be extracted-->

<!-- TODO this button needs to trigger a modal form for submission-->
<!-- TODO add server side api routes for interacting with the SpacesService-->
	<div class="nav-head">
		<button type="button">➕</button>
	</div>
	{#if spaces.length == 0}
		<div> No Spaces Found</div>
	{/if}
	{#each spaces as {name, icon}}
		<div>{icon} -- {name}</div>
	{/each}