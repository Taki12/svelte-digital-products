import { dev } from '$app/environment';
import * as cookie from 'cookie';

export interface User {
	id: string;
	email: string;
	name: string | null;
	avatar: string | null;
	provider: 'email' | 'google' | 'github';
	createdAt: Date;
}

export interface Session {
	id: string;
	userId: string;
	expiresAt: Date;
}

// In-memory storage (replace with database in production)
const users = new Map<string, User>();
const sessions = new Map<string, Session>();
const passwordHashes = new Map<string, string>();

// Simple password hashing (use bcrypt in production)
async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(password + 'salt_' + password);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
	const passwordHash = await hashPassword(password);
	return passwordHash === hash;
}

export function generateId(): string {
	return crypto.randomUUID();
}

export async function createUser(
	email: string,
	password: string | null,
	name: string | null,
	provider: User['provider'],
	avatar: string | null = null
): Promise<User> {
	const existingUser = findUserByEmail(email);
	if (existingUser) {
		throw new Error('User already exists');
	}

	const user: User = {
		id: generateId(),
		email,
		name,
		avatar,
		provider,
		createdAt: new Date()
	};

	users.set(user.id, user);

	if (password) {
		const hash = await hashPassword(password);
		passwordHashes.set(user.id, hash);
	}

	return user;
}

export function findUserByEmail(email: string): User | null {
	for (const user of users.values()) {
		if (user.email === email) {
			return user;
		}
	}
	return null;
}

export function findUserById(id: string): User | null {
	return users.get(id) || null;
}

export async function validateCredentials(email: string, password: string): Promise<User | null> {
	const user = findUserByEmail(email);
	if (!user || user.provider !== 'email') {
		return null;
	}

	const hash = passwordHashes.get(user.id);
	if (!hash) {
		return null;
	}

	const valid = await verifyPassword(password, hash);
	return valid ? user : null;
}

export function createSession(userId: string): Session {
	const session: Session = {
		id: generateId(),
		userId,
		expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
	};

	sessions.set(session.id, session);
	return session;
}

export function validateSession(sessionId: string): { session: Session; user: User } | null {
	const session = sessions.get(sessionId);
	if (!session) {
		return null;
	}

	if (session.expiresAt < new Date()) {
		sessions.delete(sessionId);
		return null;
	}

	const user = users.get(session.userId);
	if (!user) {
		sessions.delete(sessionId);
		return null;
	}

	return { session, user };
}

export function invalidateSession(sessionId: string): void {
	sessions.delete(sessionId);
}

export function setSessionCookie(sessionId: string): string {
	return cookie.serialize('session', sessionId, {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax',
		maxAge: 30 * 24 * 60 * 60 // 30 days
	});
}

export function deleteSessionCookie(): string {
	return cookie.serialize('session', '', {
		path: '/',
		httpOnly: true,
		secure: !dev,
		sameSite: 'lax',
		maxAge: 0
	});
}

export function getSessionFromCookies(cookieHeader: string | null): string | null {
	if (!cookieHeader) return null;
	const cookies = cookie.parse(cookieHeader);
	return cookies.session || null;
}
