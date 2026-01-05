import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { github } from '$lib/server/oauth/github';
import { generateState } from 'arctic';

export const GET: RequestHandler = async ({ cookies }) => {
	const state = generateState();

	cookies.set('github_oauth_state', state, {
		path: '/',
		secure: true,
		httpOnly: true,
		maxAge: 60 * 10, // 10 minutes
		sameSite: 'lax'
	});

	const url = github.createAuthorizationURL(state, ['user:email']);

	throw redirect(302, url.toString());
};
