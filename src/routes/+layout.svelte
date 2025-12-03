<script lang="ts">
	import './layout.css';
	import { AppBar, AppLayout } from 'svelte-ux';

	import Keycloak, { type KeycloakInitOptions } from 'keycloak-js';
	import { browser } from '$app/environment';
	import { ProgressCircle } from 'svelte-ux';

	// Keycloak
	let instance = {
		url: 'http://127.0.0.1:8080',
		realm: 'test',
		clientId: 'loom-app'
	};

	//TODO
	//key off keycloak results such that initially there is a pending state that displays a spinner
	//then either there's a redirect to log, a success response (in which case proceed as normal) or a fale
	//in which case we need to display an error to the user like "auth server unavailable"
	let keycloak = new Keycloak(instance);
	let initOptions: KeycloakInitOptions = { onLoad: 'login-required' };

	let displaySpinner = $state(keycloak.authenticated);

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

	let { children } = $props();
</script>

{#if !displaySpinner}
	<div class="center">
		<ProgressCircle size={100} />
	</div>
{:else}
	<AppLayout>
		<svelte:fragment slot="nav">Here's the sidebar</svelte:fragment>

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
