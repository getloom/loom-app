import { Repo } from '$lib/db/repo';
import type { Account } from '$lib/system/accounts/accountsService';
import { createSalt, hashPassword } from '$lib/util/crypto.server';

//TODO replace with a proper logger system
const log = console;

export class AccountRepo extends Repo {
	/**
	 * Creates a new account with a salted & hashed password
	 */
	async create(username: string, clear_password: string): Promise<Account> {
		const salt = createSalt();
		const password = hashPassword(clear_password, salt);
		const data = await this.sql<Account[]>`
            INSERT INTO accounts (username, password, salt) VALUES (
                ${username}, ${password}, ${salt}
            ) RETURNING account_id
        `;
		return data[0];
	}

	async read(account_id: number): Promise<Account | undefined> {
		log.debug(`[findById] ${account_id}`);
		const data = await this.sql<Account[]>`
			SELECT account_id, username, created, updated
			FROM accounts WHERE account_id=${account_id}
		`;
		log.debug('[findById] result', data);
		return data[0];
	}

	async getAll(): Promise<Account[]> {
		log.debug(`[getAll] Accounts`);
		const data = await this.sql<Account[]>`
            SELECT account_id, username, created, updated
            FROM accounts;
        `;
		log.debug('[getAll] Accounts result', data);
		return data;
	}

	async update(
		account_id: number,
		partial: Partial<Pick<Account, 'username' | 'password'>>
	): Promise<Account> {
		log.debug(`updating data for account: ${account_id}`);
		const data = await this.sql<Account[]>`
			UPDATE accounts
			SET updated=NOW(), ${this.sql(partial as any, ...Object.keys(partial))}
			WHERE account_id=${account_id}
			RETURNING *
		`;
		if (!data.count) throw Error('no account found');
		return data[0];
	}

	async delete(account_id: number): Promise<void> {
		log.debug('[deleteById]', account_id);
		const data = await this.sql`
			DELETE FROM accounts WHERE account_id=${account_id}
		`;
		if (!data.count) throw Error('no account found');
	}
}
