import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createUser, findUserByEmail, createSession } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { name, email, password } = await request.json();

		if (!email || !password) {
			throw error(400, { message: 'Email and password are required' });
		}

		if (password.length < 8) {
			throw error(400, { message: 'Password must be at least 8 characters' });
		}

		// Check if user exists
		const existingUser = findUserByEmail(email);
		if (existingUser) {
			throw error(409, { message: 'An account with this email already exists' });
		}

		// Create user
		const user = await createUser(email, password, name, 'email');

		// Create session
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
		console.error('Registration error:', err);
		throw error(500, { message: 'An error occurred during registration' });
	}
};
