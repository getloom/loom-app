import type { Account, AccountId } from "./accountsService";
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

export interface Result<T> {
    ok: true
	data: T,	
    code: number
}

export interface Error {
	ok: false
	error: string
	code: number
}

//TODO replace with a proper logger system
const log = console;

//TODO create a Service class to extend
export class AccountService {
	accountRepo: AccountRepo;

	constructor(accountRepo?: AccountRepo){
		this.accountRepo = accountRepo || new AccountRepo(postgres(defaultPostgresOptions));
	}

	async signin(username: string, clear_password: string): Promise<Result<Account> | Error> {
		// Validate input
		if (!username || !clear_password) {
			return {ok: false, error: 'Username and password are required' , code: 400 };
		}

		try {				
			const result = await this.accountRepo.verifyLogin(username, clear_password);

			if (!result) {							
				return {ok: false, error: 'Invalid credentials' , code: 401 };				
			}

			return {ok: true, data: result, code: 200};			
		} catch (error) {
			log.error('Error validating credentials:', error);
			return {ok: false, error: 'Failed to validate credentials', code: 500 };
		}
	}

	async signup(username: string, clear_password: string): Promise<Result<Account> | Error> {
		// Validate input
		if (!username || !clear_password) {
			return {ok:false, error: 'Username and password are required', code: 400 };
		}

		try {			
			const existingAccount = await this.accountRepo.findByName(username);

			if (existingAccount) {
				return {ok: false, error: 'Username already exists', code: 409 };
			}

			// Create new account with hashed password
			const account = await this.accountRepo.create(username, clear_password);

			return {ok: true, data: account, code: 201 };
		} catch (error) {
			log.error('Error creating account:', error);
			return {ok: false, error: 'Failed to create account' ,code: 500 };
		}
	}
}

