import type { AccountRepo } from '$lib/system/accounts/accountsRepo';
import { AccountService } from '$lib/system/accounts/accountsService.server';
import { beforeEach } from 'vitest';
import { describe, it, expect, test as baseTest, vi } from 'vitest';
import sinon from 'sinon';

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
});
