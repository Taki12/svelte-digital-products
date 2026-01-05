import { redirect, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { github, getGitHubUser, getGitHubEmail } from '$lib/server/oauth/github';
import { createUser, findUserByEmail, createSession } from '$lib/server/auth';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	const storedState = cookies.get('github_oauth_state');

	if (!code || !state || !storedState) {
		throw error(400, 'Invalid OAuth callback');
	}

	if (state !== storedState) {
		throw error(400, 'Invalid state');
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUser = await getGitHubUser(tokens.accessToken());

		// Get email (may need separate API call for private emails)
		let email = githubUser.email;
		if (!email) {
			email = await getGitHubEmail(tokens.accessToken());
		}

		if (!email) {
			throw error(400, 'Unable to get email from GitHub');
		}

		// Find or create user
		let user = findUserByEmail(email);

		if (!user) {
			user = await createUser(
				email,
				null,
				githubUser.name || githubUser.login,
				'github',
				githubUser.avatar_url
			);
		}

		// Create session
		const session = createSession(user.id);

		// Clean up OAuth cookies
		cookies.delete('github_oauth_state', { path: '/' });

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
		console.error('GitHub OAuth error:', err);
		if (err.status === 302) throw err;
		throw redirect(302, '/auth/login?error=oauth_failed');
	}
};
