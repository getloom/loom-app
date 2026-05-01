import {redirect, type Handle} from '@sveltejs/kit';

export const COOKIE_SESSION_NAME = 'session_id';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 week

const publicRoutes = ['/signin','/api/accounts/signin', '/signup', '/api/accounts/signup',];

export const handle: Handle = async ({event, resolve}) => {
    console.log("inside handle");
    console.log(event.url.pathname)
	const account_id = event.cookies.get(COOKIE_SESSION_NAME);	
	if (!account_id && !publicRoutes.includes(event.url.pathname)) {        
        throw redirect(303, '/signin');
	}
        
    event.locals.account_id = account_id!;    
	
    const response = await resolve(event);
	
    //TODO might still need logic around refreshing sessions & invalidating invalid sessions

	return response;
};