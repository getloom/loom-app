import {
	readKeycloakSession,
	KEYCLOAK_SESSION_COOKIE_NAME
} from '$lib/system/auth/keycloakSession.server';

export interface ResolvedSession {
	account_id?: string;
	keycloakSubject?: string;
}

export interface SessionCookies {
	get(name: string): string | undefined;
}

export async function resolveSession(
	cookies: SessionCookies,
	localSessionCookieName: string
): Promise<ResolvedSession> {
	const account_id = cookies.get(localSessionCookieName);
	const kcCookie = cookies.get(KEYCLOAK_SESSION_COOKIE_NAME);
	const kcSession = kcCookie ? await readKeycloakSession(kcCookie) : null;

	const resolved: ResolvedSession = {};
	if (account_id) resolved.account_id = account_id;
	if (kcSession) resolved.keycloakSubject = kcSession.sub;
	return resolved;
}
