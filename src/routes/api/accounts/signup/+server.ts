import { json } from '@sveltejs/kit';
import { AccountRepo } from '$lib/system/accounts/accountsRepo';
import postgres from 'postgres';
import { defaultPostgresOptions } from '$lib/db/postgres.server';
import type { RequestEvent } from '@sveltejs/kit';

//TODO replace with a proper logger system
const log = console;

export async function POST({ request }: RequestEvent) {
	const { username, password } = await request.json();

	// Validate input
	if (!username || !password) {
		return json({ error: 'Username and password are required' }, { status: 400 });
	}

	try {
		// Create connection to database
		const sql = postgres(defaultPostgresOptions);
		const accountRepo = new AccountRepo(sql);

		const existingAccount = await accountRepo.findByName(username);

		if (existingAccount) {
			return json({ error: 'Username already exists' }, { status: 409 });
		}

		// Create new account with hashed password
		const account = await accountRepo.create(username, password);

		return json({ account_id: account.account_id, username }, { status: 201 });
	} catch (error) {
		log.error('Error creating account:', error);
		return json({ error: 'Failed to create account' }, { status: 500 });
	}
}
