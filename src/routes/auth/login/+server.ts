import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateCredentials, createSession, setSessionCookie } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			throw error(400, { message: 'Email and password are required' });
		}

		const user = await validateCredentials(email, password);

		if (!user) {
			throw error(401, { message: 'Invalid email or password' });
		}

		const session = createSession(user.id);

		cookies.set('session', session.id, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 30 * 24 * 60 * 60 // 30 days
		});

		return json({
			success: true,
			user: {
				id: user.id,
				email: user.email,
				name: user.name
			}
		});
	} catch (err: any) {
		if (err.status) throw err;
		console.error('Login error:', err);
		throw error(500, { message: 'An error occurred during login' });
	}
};
