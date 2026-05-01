import { json } from '@sveltejs/kit';
import { AccountService } from '$lib/system/accounts/accountsService.server';
import type { RequestEvent } from '@sveltejs/kit';
import { COOKIE_MAX_AGE, COOKIE_SESSION_NAME } from '../../../../hooks.server';

//TODO replace with a proper logger system
const log = console;

export async function POST({ request, cookies}: RequestEvent) {	
	const { username, password } = await request.json();

	const result = await new AccountService().signin(username, password);

	if (result.ok){
		const {data, code} = result
		const account_id = result.data.account_id;
		cookies.set(COOKIE_SESSION_NAME, account_id + '', {path: '/', maxAge: COOKIE_MAX_AGE})
		return json(data, {status: code})
	} else {
		const {error, code} = result
		return json(error, {status: code})
	}

	
}
