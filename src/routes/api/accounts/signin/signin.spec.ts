import { describe, it, expect } from 'vitest';
import {POST} from '../signin/+server'
import type { RequestEvent } from '@sveltejs/kit';

describe('logging in', () => {
	it('validates on successful login', () => {
        const requestEvent = {request: { body: { username: "test", password: "test" } }} as unknown as RequestEvent;
		const result = POST(requestEvent);
	});
    it('fails with non-existant user'), () => {

    }
    it('fails with wrong password', () => {

    })
});