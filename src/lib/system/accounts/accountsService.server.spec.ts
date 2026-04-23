import type { AccountRepo } from '$lib/system/accounts/accountsRepo';
import { AccountService } from '$lib/system/accounts/accountsService.server';
import { beforeEach } from 'vitest';
import { describe, it, expect, test as baseTest, vi } from 'vitest';
import sinon from 'sinon';
import type { Account } from './accountsService';

describe('signing in', () => {
    let service: AccountService;
    let repo: AccountRepo

    beforeEach(() => {
        repo = {
            verifyLogin: () => {},
        } as any as AccountRepo

        service = new AccountService(repo);
    });

	it('validates on successful login', async () => {
		// Setup mock to return true for successful login
		sinon.stub(repo,'verifyLogin').resolves(true);        
		
		const result = await service.signin('username', 'password');

		expect(result).toEqual({ data: { message: 'Login successful' }, code: { status: 200 } });		
	});

	it('fails with bad credentials', async () => {
		// Setup mock to return false for failed login (user not found)
		sinon.stub(repo,'verifyLogin').resolves(false);                
		
		const result = await service.signin('userrname', 'password');

		expect(result).toEqual({ data: { error: 'Invalid credentials' }, code: { status: 401 } });
	});

	it('handles validation errors', async () => {		
		const result = await service.signin('', 'password');

		expect(result).toEqual({
			data: { error: 'Username and password are required' },
			code: { status: 400 }
		});
	});


	it('handles thrown errors', async () => {
		sinon.stub(repo,'verifyLogin').throwsException(new Error("Thrown error for testing"));
		
		const result = await service.signin('username', 'password');
	
		expect(result).toEqual({
			data: { error: 'Failed to validate credentials' },
			code: { status: 500 }
		});
	})
});

describe('signing up', () => {
    let service: AccountService;
    let repo: AccountRepo

    beforeEach(() => {
        repo = {
            findByName: () => {},
            create: () => {}
        } as any as AccountRepo

        service = new AccountService(repo);
    });

	it('creates an account', async () => {
		// Setup mock to return nothing for a name, than an account for creation
        const account: Account = {account_id: 1, username: 'username', created: new Date(), updated: null}
		sinon.stub(repo,'findByName').resolves(undefined);
        sinon.stub(repo,'create').resolves(account);
		
		const result = await service.signup('username', 'password');

		expect(result).toEqual({ data: account, code: { status: 201 } });		
	});

	it('fails with duplicate name', async () => {
		// Setup mock to return false for failed login (user not found)
        const account: Account = {account_id: 1, username: 'userrname', created: new Date(), updated: null}
		sinon.stub(repo,'findByName').resolves(account);        
		
		const result = await service.signup('userrname', 'password');

		expect(result).toEqual({ data: { error: 'Username already exists' }, code: { status: 409 } });
	});

	it('handles validation errors', async () => {		
		const result = await service.signup('', 'password');

		expect(result).toEqual({
			data: { error: 'Username and password are required' },
			code: { status: 400 }
		});
	});

    it('handles thrown errors', async () => {
        sinon.stub(repo,'findByName').throwsException(new Error("Thrown error for testing"));
        
        const result = await service.signup('username', 'password');

        expect(result).toEqual({
			data: { error: 'Failed to create account' },
			code: { status: 500 }
		});
    })
});