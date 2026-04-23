import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { AccountService } from '$lib/system/accounts/accountsService.server';

//TODO replace with a proper logger system
const log = console;

export async function POST({ request }: RequestEvent) {
	const { username, clear_password } = await request.json();
	
	const {data, code} = await new AccountService().signup(username, clear_password);
	
	return json(data, code)
}
