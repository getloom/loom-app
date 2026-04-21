import type { AccountId } from "./accountsService";
import { AccountRepo } from '$lib/system/accounts/accountsRepo';
import postgres from 'postgres';
import { defaultPostgresOptions } from '$lib/db/postgres.server';

export interface ServerAccount {
    account_id: AccountId;
    username: string;
    password: string;
    salt: string;	
    created: Date;
    updated: Date | null;	
}

export interface Response<T> {
    data: T,
    code: {status: number}
}

export interface ErrorMessage {
    error: string
}

export interface Message {
    message: string
}

//TODO replace with a proper logger system
const log = console;

//TODO create a Service class to extend
export class AccountService {
	accountRepo: AccountRepo;

	constructor(accountRepo?: AccountRepo){
		this.accountRepo = accountRepo || new AccountRepo(postgres(defaultPostgresOptions));
	}

	async signin(username: string, clear_password: string): Promise<Response<ErrorMessage | Message>> {
    // Validate input
	if (!username || !clear_password) {
		return {data:{ error: 'Username and password are required' }, code:{ status: 400 }};
	}

	try {				
		const result = await this.accountRepo.verifyLogin(username, clear_password);

		if (result) {
			return {data:{ message: 'Login successful' }, code:{ status: 200 }};
		} else {
			return {data:{ error: 'Invalid credentials' }, code: { status: 401 }};
		}
	} catch (error) {
		log.error('Error validating credentials:', error);
		return {data:{ error: 'Failed to validate credentials' }, code:{ status: 500 }};
	}
}
}

