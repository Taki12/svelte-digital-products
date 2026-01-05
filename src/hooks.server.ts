import type { Handle } from '@sveltejs/kit';
import { validateSession, getSessionFromCookies } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session');

	if (sessionId) {
		const result = validateSession(sessionId);
		if (result) {
			event.locals.user = result.user;
			event.locals.session = result.session;
		} else {
			// Invalid session, clear cookie
			event.cookies.delete('session', { path: '/' });
		}
	}

	return resolve(event);
};
