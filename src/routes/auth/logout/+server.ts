import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { invalidateSession, getSessionFromCookies } from '$lib/server/auth';

export const POST: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get('session');

	if (sessionId) {
		invalidateSession(sessionId);
	}

	cookies.delete('session', { path: '/' });

	throw redirect(302, '/');
};

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get('session');

	if (sessionId) {
		invalidateSession(sessionId);
	}

	cookies.delete('session', { path: '/' });

	throw redirect(302, '/');
};
