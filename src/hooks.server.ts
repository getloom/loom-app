import { redirect, type Handle } from '@sveltejs/kit';
import { resolveSession } from '$lib/system/auth/requestAuth.server';

export const COOKIE_SESSION_NAME = 'session_id';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 week

const publicRoutes = [
	'/signin',
	'/api/accounts/signin',
	'/signup',
	'/api/accounts/signup',
	'/auth/keycloak/login',
	'/auth/keycloak/callback',
	'/auth/logout'
];

export const handle: Handle = async ({ event, resolve }) => {
	const { account_id, keycloakSubject } = await resolveSession(event.cookies, COOKIE_SESSION_NAME);

	if (!account_id && !keycloakSubject && !publicRoutes.includes(event.url.pathname)) {
		throw redirect(303, '/signin');
	}

	if (account_id) event.locals.account_id = account_id;
	if (keycloakSubject) event.locals.keycloakSubject = keycloakSubject;

	return resolve(event);
};
