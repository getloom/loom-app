import { describe, it, expect, vi, beforeEach } from 'vitest';
import sinon from 'sinon';

vi.mock('$lib/system/auth/keycloakSession.server', () => ({
	KEYCLOAK_SESSION_COOKIE_NAME: 'kc_session',
	readKeycloakSession: vi.fn()
}));

const { resolveSession } = await import('./requestAuth.server');
const { readKeycloakSession } = await import('$lib/system/auth/keycloakSession.server');

const LOCAL_SESSION_COOKIE_NAME = 'session_id';

describe('resolveSession', () => {
	let cookies: { get: sinon.SinonStub };

	beforeEach(() => {
		cookies = { get: sinon.stub().returns(undefined) };
		vi.mocked(readKeycloakSession).mockReset();
	});

	it('resolves only account_id when only the local session cookie is present', async () => {
		cookies.get.withArgs(LOCAL_SESSION_COOKIE_NAME).returns('42');

		const result = await resolveSession(cookies, LOCAL_SESSION_COOKIE_NAME);

		expect(result).toEqual({ account_id: '42' });
		expect(readKeycloakSession).not.toHaveBeenCalled();
	});

	it('resolves only keycloakSubject when only a valid Keycloak session cookie is present', async () => {
		cookies.get.withArgs('kc_session').returns('sealed-value');
		vi.mocked(readKeycloakSession).mockResolvedValue({
			sub: 'kc-user-1',
			id_token: 'id-token'
		});

		const result = await resolveSession(cookies, LOCAL_SESSION_COOKIE_NAME);

		expect(result).toEqual({ keycloakSubject: 'kc-user-1' });
	});

	it('resolves both when both cookies are present and valid', async () => {
		cookies.get.withArgs(LOCAL_SESSION_COOKIE_NAME).returns('42');
		cookies.get.withArgs('kc_session').returns('sealed-value');
		vi.mocked(readKeycloakSession).mockResolvedValue({
			sub: 'kc-user-1',
			id_token: 'id-token'
		});

		const result = await resolveSession(cookies, LOCAL_SESSION_COOKIE_NAME);

		expect(result).toEqual({ account_id: '42', keycloakSubject: 'kc-user-1' });
	});

	it('resolves neither when no cookies are present', async () => {
		const result = await resolveSession(cookies, LOCAL_SESSION_COOKIE_NAME);

		expect(result).toEqual({});
		expect(readKeycloakSession).not.toHaveBeenCalled();
	});

	it('treats an expired/invalid Keycloak cookie as absent', async () => {
		cookies.get.withArgs('kc_session').returns('sealed-value');
		vi.mocked(readKeycloakSession).mockResolvedValue(null);

		const result = await resolveSession(cookies, LOCAL_SESSION_COOKIE_NAME);

		expect(result).toEqual({});
	});
});
