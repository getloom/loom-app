import { json } from '@sveltejs/kit';
import { signin } from '$lib/system/accounts/accountsService.server';
import type { RequestEvent } from '@sveltejs/kit';

//TODO replace with a proper logger system
const log = console;

export async function POST({ request }: RequestEvent) {
	const { username, password } = await request.json();

	const {data, code} = await signin(username, password);

	return json(data, code)
}
