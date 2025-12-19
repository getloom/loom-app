<script lang="ts">
	import './layout.css';
	import { AppBar, AppLayout } from 'svelte-ux';

	import Keycloak, { type KeycloakInitOptions } from 'keycloak-js';
	import { browser } from '$app/environment';
	import { ProgressCircle } from 'svelte-ux';

	import { env } from '$env/dynamic/public';	

	let {data, children } = $props();	

	// Keycloak
	let instance = {
		url: env.PUBLIC_AUTH_URL,
		realm: env.PUBLIC_AUTH_REALM,
		clientId: env.PUBLIC_AUTH_CLIENT_ID
	};

	let keycloak = new Keycloak(instance);
	let initOptions: KeycloakInitOptions = { onLoad: 'login-required' };

	let displaySpinner = $state(keycloak.authenticated);

	//TODO figure out how to do server side data fetching for layout

	if (browser) {
		console.log('in browser, checking keycloak');
		const result = keycloak
			.init(initOptions)
			.then(function () {
				displaySpinner = true;
			})
			.catch(function (error: any) {
				console.error('failed to initialize');
				console.error(error);
				//TODO make the page display a proper error message
			});
	}

	
</script>

{#if !displaySpinner}
	<div class="center">
		<ProgressCircle size={100} />
	</div>
{:else}
	<AppLayout>
		<svelte:fragment slot="nav">
			{#each data.spaces as {name, icon}}
				<div>{icon} -- {name}</div>
			{/each}
		</svelte:fragment>		

		<AppBar title="Loom" class="bg-primary text-primary-content">
			<div slot="actions">This is where the login would go</div>
		</AppBar>

		<main>
			{@render children()}
		</main>
	</AppLayout>
{/if}

<style>
	.center {
		display: block;
		text-align: center;
		margin-top: 20%;
	}
</style>
