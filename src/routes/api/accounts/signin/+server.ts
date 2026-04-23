import { json } from '@sveltejs/kit';
import { AccountService } from '$lib/system/accounts/accountsService.server';
import type { RequestEvent } from '@sveltejs/kit';

//TODO replace with a proper logger system
const log = console;

export async function POST({ request }: RequestEvent) {
	const { username, clear_password } = await request.json();

	const {data, code} = await new AccountService().signin(username, clear_password);

	return json(data, code)
}
