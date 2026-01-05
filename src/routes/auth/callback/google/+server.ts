import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { google, getGoogleUser } from '$lib/server/oauth/google';
import { createUser, findUserByEmail, createSession } from '$lib/server/auth';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	const storedState = cookies.get('google_oauth_state');
	const storedCodeVerifier = cookies.get('google_code_verifier');

	if (!code || !state || !storedState || !storedCodeVerifier) {
		throw error(400, 'Invalid OAuth callback');
	}

	if (state !== storedState) {
		throw error(400, 'Invalid state');
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
		const googleUser = await getGoogleUser(tokens.accessToken());

		// Find or create user
		let user = findUserByEmail(googleUser.email);

		if (!user) {
			user = await createUser(
				googleUser.email,
				null,
				googleUser.name,
				'google',
				googleUser.picture
			);
		}

		// Create session
		const session = createSession(user.id);

		// Clean up OAuth cookies
		cookies.delete('google_oauth_state', { path: '/' });
		cookies.delete('google_code_verifier', { path: '/' });

		// Set session cookie
		cookies.set('session', session.id, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 // 30 days
		});

		throw redirect(302, '/');
	} catch (err: any) {
		console.error('Google OAuth error:', err);
		if (err.status === 302) throw err;
		throw redirect(302, '/auth/login?error=oauth_failed');
	}
};
