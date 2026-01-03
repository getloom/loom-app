<script lang="ts">
    import type { Space } from '$lib/system/spaces/spacesService';
	import { Button, Dialog } from 'svelte-ux';

    export let spaces: Space[]
    let openAsync = false;
    let loading = false;
</script>

<!-- TODO all this junk inside the svelte:fragment needs to be extracted-->

<!-- TODO this button needs to trigger a modal form for submission-->
<!-- TODO add server side api routes for interacting with the SpacesService-->
	<div class="nav-head">
        <Button on:click={() => (openAsync = true)}>➕</Button>
        <Dialog bind:open={openAsync} {loading} persistent={loading}>
        <div slot="title">Creating new space</div>
        <div>
            <form style="padding:20px">
                <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />
            </form>
        </div>
        <div slot="actions">
            <Button
            on:click={(e) => {
                // Wait for response before closing (done explicitly)
                e.stopPropagation();
                loading = true;
                setTimeout(() => {
                loading = false;
                openAsync = false;
                }, 1000);
            }}
            variant="fill"
            color="primary"
            >
            Save
            </Button>
            <Button>Cancel</Button>
        </div>
        </Dialog>

	</div>
	{#if spaces.length == 0}
		<div> No Spaces Found</div>
	{/if}
	{#each spaces as {name, icon}}
		<div>{icon} -- {name}</div>
	{/each}