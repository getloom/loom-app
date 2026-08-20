// See https://svelte.dev/docs/kit/types#app.d.ts

import type { AccountId } from "$lib/system/accounts/accountsService";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		 interface Locals {
			account_id?: AccountId;
			keycloakSubject?: string;
		 }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
