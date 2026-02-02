<script lang="ts">
	import { Button, Dialog } from 'svelte-ux';

    let openAsync = false;
    let loading = false;
</script>

<!-- TODO this button needs to trigger a modal form for submission-->
<!-- TODO add server side api routes for interacting with the SpacesService-->
	<div class="nav-head">
        <Button on:click={() => (openAsync = true)}>➕</Button>
        <Dialog bind:open={openAsync} {loading} persistent={loading}>
        <div slot="title">Creating new space</div>
        <div>
            
            <form class="name">
                <label class="label" for="name">Name:</label>
                <input class="input" type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />
                <label class="label" for="name">Icon:</label>
                <input class="input" type="text" id="name" name="name" required minlength="1" maxlength="1" size="10" />
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

    <style>
        .name {
            padding:20px;
        }
        .input {
            background-color: color-mix(in oklab, var(--color-surface-content) 5%, transparent);
            vertical-align:middle
        }
        .label {
            margin-right: 1rem;
        }
    </style>