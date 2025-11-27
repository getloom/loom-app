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

  let keycloak = new Keycloak(instance);
  let initOptions: KeycloakInitOptions = { onLoad: "login-required" };

  if (browser) {
	keycloak
		.init(initOptions)
		.then(function (authenticated: any) {
		console.info("Authenticated");
		console.log(keycloak)
		})
		.catch(function () {
		console.error("failed to initialize");
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
