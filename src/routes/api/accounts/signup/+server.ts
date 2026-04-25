import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { AccountService } from '$lib/system/accounts/accountsService.server';

//TODO replace with a proper logger system
const log = console;

export async function POST({ request }: RequestEvent) {
	const { username, password } = await request.json();
	
	const {data, code} = await new AccountService().signup(username, password);
	
	return json(data, code)
}
