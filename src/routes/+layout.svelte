<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { AppBar, AppLayout } from 'svelte-ux';

	import Keycloak, { type KeycloakInitOptions } from "keycloak-js";
	import { browser } from '$app/environment';

	// Keycloak
	let instance = {
		url: "http://127.0.0.1:8080",
		realm: "test",
		clientId: "loom-app",
	};

	//TODO
	//key off keycloak results such that initially there is a pending state that displays a spinner
	//then either there's a redirect to log, a success response (in which case proceed as normal) or a fale
	//in which case we need to display an error to the user like "auth server unavailable"
	let keycloak = new Keycloak(instance);
	let initOptions: KeycloakInitOptions = { onLoad: "login-required" };

	console.log("are we authenticated?")
	console.log(keycloak.authenticated)
	console.log(keycloak)

  	if (browser) {
		console.log("in browser, checking keycloak");
		const result = keycloak
			.init(initOptions)
			.then(function (authenticated: any) {
			console.info("Authenticated");
			console.log(authenticated);
			console.log(keycloak)
			})
			.catch(function (error: any) {
			console.error("failed to initialize");
			console.error(error);
			});
	}

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
