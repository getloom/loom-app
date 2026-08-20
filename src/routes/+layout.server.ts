import { defaultPostgresOptions } from '$lib/db/postgres.server';
import { AccountRepo } from '$lib/system/accounts/accountsRepo';
import postgres from 'postgres';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const users = await new AccountRepo(postgres(defaultPostgresOptions)).getAll();
	return {
		users: users,
		isAuthenticated: !!(locals.account_id || locals.keycloakSubject)
	};
};
