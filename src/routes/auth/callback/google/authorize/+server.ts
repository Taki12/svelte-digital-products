import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { google } from '$lib/server/oauth/google';
import { generateState, generateCodeVerifier } from 'arctic';

export const GET: RequestHandler = async ({ cookies }) => {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	cookies.set('google_oauth_state', state, {
		path: '/',
		secure: true,
		httpOnly: true,
		maxAge: 60 * 10, // 10 minutes
		sameSite: 'lax'
	});

	cookies.set('google_code_verifier', codeVerifier, {
		path: '/',
		secure: true,
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	const url = google.createAuthorizationURL(state, codeVerifier, ['email', 'profile']);

	throw redirect(302, url.toString());
};
