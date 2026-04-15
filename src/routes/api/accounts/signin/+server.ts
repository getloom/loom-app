import { json } from '@sveltejs/kit';
import { AccountRepo } from '$lib/system/accounts/accountsRepo';
import { hashPassword, createSalt } from '$lib/util/crypto.server';
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

		const result = await accountRepo.verifyLogin(username, password);

		if (result) {
			return json({ message: 'Login successful' }, { status: 200 });
		} else {
			return json({ error: 'Invalid credentials' }, { status: 401 });
		}
	} catch (error) {
		log.error('Error validating credentials:', error);
		return json({ error: 'Failed to validate credentials' }, { status: 500 });
	}
}
